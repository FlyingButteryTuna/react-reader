package dev.epiphany.readerapi.demo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChapterStatusRequest {
    private String path;
    private Boolean isRead;
}
