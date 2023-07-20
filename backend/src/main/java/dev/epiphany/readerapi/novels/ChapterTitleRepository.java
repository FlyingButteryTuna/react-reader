package dev.epiphany.readerapi.novels;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChapterTitleRepository extends JpaRepository<Chapter, Integer> {
    Optional<Chapter> findByChapterTitle(String chapterTitle);
}
