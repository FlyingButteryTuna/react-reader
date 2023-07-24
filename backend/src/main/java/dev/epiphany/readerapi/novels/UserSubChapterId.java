package dev.epiphany.readerapi.novels;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class NovelSubChapterId implements Serializable {
    @Column(name = "novel_id")
    private Integer novelId;

    @Column(name = "subchapter_id")
    private Integer subchapterId;
}
