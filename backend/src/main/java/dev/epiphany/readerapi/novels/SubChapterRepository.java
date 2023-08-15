package dev.epiphany.readerapi.novels;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SubChapterRepository extends JpaRepository<SubChapter, Integer> {
    Optional<SubChapter> findByPath(String path);
}
