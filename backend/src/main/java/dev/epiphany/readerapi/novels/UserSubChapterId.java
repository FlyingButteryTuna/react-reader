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
public class UserSubChapterId implements Serializable {
    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "subchapter_id")
    private Integer subchapterId;
}
