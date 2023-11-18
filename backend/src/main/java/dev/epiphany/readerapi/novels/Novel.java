package dev.epiphany.readerapi.novels;

import dev.epiphany.readerapi.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "novel")
public class Novel {
    @Id
    @GeneratedValue
    private Integer id;

    @Enumerated(value = EnumType.STRING)
    private NovelSource novelSource;

    @Column(unique = true)
    private String urlPath;
    private String title;
    private String author;
    private long publicationDate;
    private long lastupdateDate;
    private long seriesLength;

    @Enumerated(value = EnumType.STRING)
    private NovelType novelType;

    @Enumerated(value = EnumType.STRING)
    private NovelStatus novelStatus;

    @ManyToMany(mappedBy = "novels")
    private Set<User> users;

    @OneToMany(
            mappedBy = "novel",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Chapter> chapters;

    public void addChapter(Chapter chapter) {
        chapters.add(chapter);
        chapter.setNovel(this);
    }

    public void removeChapter(Chapter chapter) {
        chapters.remove(chapter);
        chapter.setNovel(null);
    }
}
