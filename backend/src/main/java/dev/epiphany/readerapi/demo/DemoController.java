package dev.epiphany.readerapi.demo;

import dev.epiphany.readerapi.parsers.ParserNarou;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/demo")
@RequiredArgsConstructor
public class DemoController {
    private final ParserNarou parserNarou;
    private final AddNovelService addNovelService;
    @GetMapping("/chapters")
    public ResponseEntity<String> test(ChapterBodyRequest request) throws IOException {
        System.out.println("fetching chapter: " + request.getPath());
        return ResponseEntity.ok(parserNarou.parseChapterText(request.getPath()).toString());
    }

    @GetMapping("/serieses")
    public ResponseEntity<String> test1(ChapterBodyRequest request) {
        System.out.println("fetching series info: " + request.getPath());
        return ResponseEntity.ok(parserNarou.parseChapterList(request.getPath()).toString());
    }

    @PostMapping("/novel")
    public ResponseEntity<String> addNovel(@RequestBody ChapterBodyRequest request,
                                           Authentication authentication) {
        System.out.println("adding novel: " + request.getPath());
        addNovelService.addNovel(parserNarou.parseChapterList(request.getPath()),
                authentication.getName());
        return ResponseEntity.ok("success");
    }

    @PostMapping("/chapterStatus")
    public ResponseEntity<String> setRead(@RequestBody ChapterStatusRequest request,
                                           Authentication authentication) {
        System.out.println("setting chapter status: " + request.getPath());
        addNovelService.setChapterRead(authentication.getName(), request.getPath(), request.getIsRead());
        return ResponseEntity.ok("success");
    }

    @PostMapping("/chapterBookmark")
    public ResponseEntity<String> setBookMark(@RequestBody ChapterBookmarkRequest request,
                                          Authentication authentication) {
        System.out.println("setting chapter bookmark: " + request.getPath());
        addNovelService.setBookMark(authentication.getName(), request.getPath(), request.getIsBookmarked());
        return ResponseEntity.ok("success");
    }
}
