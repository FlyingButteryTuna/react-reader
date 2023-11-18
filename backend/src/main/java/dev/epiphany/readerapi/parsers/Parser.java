package dev.epiphany.readerapi.parsers;

import com.fasterxml.jackson.databind.node.ObjectNode;

import java.io.IOException;
import java.text.ParseException;

public interface Parser {
    public ObjectNode parseChapterText(String path) throws IOException;
    public ObjectNode parseChapterList(String path) throws ParseException;
}
