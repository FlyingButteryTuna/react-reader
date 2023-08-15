package dev.epiphany.readerapi.novels;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "chapter")
public class Chapter {
    @Id
    @GeneratedValue
    private Integer id;

    private String chapterTitle;

    @ManyToOne(fetch = FetchType.LAZY)
    private Novel novel;

    @OneToMany(
            mappedBy = "chapter",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<SubChapter> subchapters;

    public void addSubChapter(SubChapter subChapter) {
        subchapters.add(subChapter);
        subChapter.setChapter(this);
    }

    public void removeSubChapter(SubChapter subChapter) {
        subchapters.remove(subChapter);
        subChapter.setChapter(null);
    }
}
