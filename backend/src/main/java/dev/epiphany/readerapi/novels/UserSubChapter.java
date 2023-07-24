package dev.epiphany.readerapi.novels;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "novel_subchapter")
public class NovelSubChapter {
    @EmbeddedId
    private NovelSubChapterId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("novelId")
    private Novel novel;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("subchapterId")
    private SubChapter subChapter;

    @Column(name = "is_read")
    private boolean isRead = false;

    public NovelSubChapter(Novel novel, SubChapter subChapter){
        this.novel = novel;
        this.subChapter = subChapter;
        this.id = new NovelSubChapterId(novel.getId(), subChapter.getId());
    }
}
