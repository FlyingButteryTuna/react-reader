package dev.epiphany.readerapi.parsers;

import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.stereotype.Service;

import java.io.IOException;

public interface Parser {
    public ObjectNode parseChapterText(String path) throws IOException;
    public ObjectNode parseChapterList(String path);
}
