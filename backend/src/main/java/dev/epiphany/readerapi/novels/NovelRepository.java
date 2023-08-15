package dev.epiphany.readerapi.novels;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface NovelRepository extends JpaRepository<Novel, Integer> {
    Optional<Novel> findByUrlPath(String urlPath);
}
