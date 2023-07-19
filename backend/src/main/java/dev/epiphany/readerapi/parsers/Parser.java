package dev.epiphany.readerapi.parsers;

import org.springframework.stereotype.Service;

import java.io.IOException;

public interface Parser {
    public String parseChapterText(String path) throws IOException;
    public String parseChapterList(String path);
}
