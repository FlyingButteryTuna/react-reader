package dev.epiphany.readerapi.demo;

import dev.epiphany.readerapi.parsers.ParserNarou;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/demo")
@RequiredArgsConstructor
public class DemoController {
    private final ParserNarou parserNarou;
    private final AddNovelService addNovelService;
    @GetMapping("/test")
    public ResponseEntity<String> test(ChapterBodyRequest request) throws IOException {
        System.out.println("fetching chapter: " + request.getPath());
        return ResponseEntity.ok(parserNarou.parseChapterText(request.getPath()).toString());
    }

    @GetMapping("/test1")
    public ResponseEntity<String> test1(ChapterBodyRequest request) {
        System.out.println("fetching series info: " + request.getPath());
        return ResponseEntity.ok(parserNarou.parseChapterList(request.getPath()).toString());
    }

    @GetMapping("/addNovel")
    public ResponseEntity<String> addNovel(@RequestBody ChapterBodyRequest request,
                                           Authentication authentication) {
        addNovelService.addNovel(parserNarou.parseChapterList(request.getPath()),
                authentication.getName());
        return ResponseEntity.ok("success");
    }
}
