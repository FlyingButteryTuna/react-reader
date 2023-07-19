package dev.epiphany.readerapi.demo;

import dev.epiphany.readerapi.parsers.ParserNarou;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/demo")
@RequiredArgsConstructor
public class DemoController {
    private final ParserNarou parserNarou;
    @GetMapping("/test")
    public ResponseEntity<String> test(@RequestBody ChapterBodyRequest request) throws IOException {

        return ResponseEntity.ok(parserNarou.parseChapterText(request.getPath()));
    }

    @GetMapping("/test1")
    public ResponseEntity<String> test1(@RequestBody ChapterBodyRequest request) throws IOException {
        return ResponseEntity.ok(parserNarou.parseChapterList(request.getPath()));
    }
}
