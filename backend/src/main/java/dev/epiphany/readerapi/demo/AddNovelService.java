package dev.epiphany.readerapi.demo;

import com.fasterxml.jackson.databind.node.ObjectNode;
import dev.epiphany.readerapi.novels.*;
import dev.epiphany.readerapi.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class AddNovelService {
    private final NovelRepository novelRepository;
    private final ChapterTitleRepository chapterTitleRepository;
    private final SubChapterRepository subChapterRepository;
    private final UserRepository userRepository;
    private final UserSubChapterRepository userSubChapterRepository;

    @Transactional(propagation = Propagation.REQUIRED)
    public void addNovel(ObjectNode chaptersIndex, String email) {
        String title = chaptersIndex.get("series_title").toString();
        String path = chaptersIndex.get("series_path").toString();
        var chapters = chaptersIndex.get("chapter_index");
        var novel = Novel.builder()
                .title(title)
                .novelSource(NovelSource.NAROU)
                .urlPath(path)
                .chapters(new ArrayList<>())
                .build();

        for (var chapter : chapters){
           String chapterTitle = chapter.get("chapter_title").toString();
           var subchapters = chapter.get("subchapter_list");
           var chapterTitleObj = Chapter.builder()
                   .chapterTitle(chapterTitle)
                   .subchapters(new ArrayList<>())
                   .build();

           for (var subchapter: subchapters) {
               String subchapterPath = subchapter.get("chapter_link").toString();
               String subchapterTitle = subchapter.get("chapter_subtitle").toString();
               var subchapterObj = SubChapter.builder()
                       .title(subchapterTitle)
                       .path(subchapterPath)
                       .users(new ArrayList<>())
                       .build();

               var savedSubchapter = subChapterRepository.save(subchapterObj);
               chapterTitleObj.addSubChapter(savedSubchapter);
           }
           var savedChapter = chapterTitleRepository.save(chapterTitleObj);
           novel.addChapter(savedChapter);
        }
        var novelSaved = novelRepository.save(novel);
        var user = userRepository.findByEmail(email);
        user.ifPresent(value -> value.addNovel(novelSaved));
        user.ifPresent(userRepository::save);
    }

    public void setChapterRead(String email,
                               String chapterPath,
                               Boolean isRead) {

        var user = userRepository.findByEmail(email).orElseThrow();
        System.out.println(chapterPath);
        var subchapter = subChapterRepository.findByPath(chapterPath).orElseThrow();

        var userSubchapter = userSubChapterRepository.findByUserAndSubChapter(user, subchapter).orElseThrow();
        if (userSubchapter.isRead() != isRead) {
            userSubchapter.setRead(isRead);
            userSubChapterRepository.save(userSubchapter);
        }

    }

    public void setBookMark(String email,
                            String chapterPath,
                            Boolean isBookmarked) {
        var user = userRepository.findByEmail(email).orElseThrow();
        var subchapter = subChapterRepository.findByPath(chapterPath).orElseThrow();

        var userSubchapter = userSubChapterRepository.findByUserAndSubChapter(user, subchapter);

        if (isBookmarked){
            var bookMarked = userSubChapterRepository.findBookMarkedChapter(user.getId(),
                    subchapter.getChapter().getNovel().getId());
            bookMarked.ifPresent(value -> value.setBookmarked(false));
        }
        userSubchapter.ifPresent(value -> value.setBookmarked(isBookmarked));
        userSubchapter.ifPresent(userSubChapterRepository::save);
    }
}
