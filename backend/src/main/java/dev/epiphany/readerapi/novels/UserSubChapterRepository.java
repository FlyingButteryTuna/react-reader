package dev.epiphany.readerapi.novels;

import dev.epiphany.readerapi.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserSubChapterRepository extends JpaRepository<UserSubChapter, Integer> {
    Optional<UserSubChapter> findByUserAndSubChapter(User user, SubChapter subChapter);
    @Query(value = "SELECT us.* " +
            "FROM user_subchapter us " +
            "WHERE us.user_id = ?1 " +
            "AND us.is_bookmarked = true " +
            "AND EXISTS (" +
            "    SELECT 1 " +
            "    FROM subchapter sc " +
            "    INNER JOIN chapter c ON sc.chapter_id = c.id " +
            "    WHERE sc.id = us.sub_chapter_id " +
            "    AND c.novel_id = ?2" +
            ") " +
            "LIMIT 1",
            nativeQuery = true)
    Optional<UserSubChapter> findBookMarkedChapter(Integer user_id, Integer novel_id);
}
