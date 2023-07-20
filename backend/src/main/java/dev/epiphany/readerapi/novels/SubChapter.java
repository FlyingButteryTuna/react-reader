package dev.epiphany.readerapi.novels;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "subchapter")
public class SubChapter {
    @Id
    @GeneratedValue
    private Integer id;

    @Column(unique = true)
    private String path;

    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    private Chapter chapter;
}
