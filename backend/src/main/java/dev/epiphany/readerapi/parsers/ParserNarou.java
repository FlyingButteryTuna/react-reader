package dev.epiphany.readerapi.parsers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.NoArgsConstructor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.lang.reflect.Array;
import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


@NoArgsConstructor
@Service
public class ParserNarou implements Parser {
    final private String baseLink = "https://ncode.syosetu.com/";

    @Override
    public String parseChapterText(String path) throws IOException {
        String chapterPathRegex = "n\\d{4}[A-Za-z]{2}(?:/\\d+)?/";
        Pattern pattern = Pattern.compile(chapterPathRegex);
        Matcher matcher = pattern.matcher(path);
        if (!matcher.matches()){
            throw new RuntimeException("Invalid path");
        }

        final String chapterBodyDivId = "novel_honbun";

        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode rootNode = objectMapper.createObjectNode();
        ArrayNode chapterBody = objectMapper.createArrayNode();

        Document doc;
        try {
            doc = Jsoup.connect(baseLink + path).get();
        } catch (IOException e) {
            throw new RuntimeException("Could not fetch data from given path. Invalid Link.");
        }

        Elements content = Objects.requireNonNull(doc.getElementById(chapterBodyDivId),
                "Could not fetch data from given path. Invalid HTML.").children();

        for (Element paragraph : content) {
            chapterBody.add(paragraph.html());
        }
        rootNode.set("chapter_body", chapterBody);
        return rootNode.toString();
    }

    @Override
    public String parseChapterList(String path) {
        String seriesPathRegex = "n\\d{4}[A-Za-z]{2}/";
        Pattern pattern = Pattern.compile(seriesPathRegex);
        Matcher matcher = pattern.matcher(path);
        if (!matcher.matches()){
            throw new RuntimeException("Invalid path");
        }

        final String seriesIndexBoxId = "index_box";
        final String chapterTitleClassName = "chapter_title";
        final String chapterListElementClassName = "novel_sublist2";
        final String chapterBodyDivId = "novel_honbun";
  

        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode rootNode = objectMapper.createObjectNode();
        ArrayNode seriesIndex = objectMapper.createArrayNode();
        ObjectNode chapterIndexRoot =  objectMapper.createObjectNode();
        ArrayNode chapterIndex = objectMapper.createArrayNode();

        Document doc;
        try {
            doc = Jsoup.connect(baseLink + path).get();
        } catch (IOException e) {
            throw new RuntimeException("Could not fetch data from given path. Invalid link.");
        }

        if (doc.getElementById(chapterBodyDivId) != null){
            throw new RuntimeException("Couldn't fetch list of chapters - Short story.");
        }

        Elements content = Objects.requireNonNull(doc.getElementsByClass(seriesIndexBoxId),
                        "Could not fetch data from given path. Invalid HTML.").get(0).children();

        for (Element el : content) {

            if (el.className().equals(chapterTitleClassName)){
                if (!chapterIndex.isEmpty()){
                    chapterIndexRoot.set("subchapter_list", chapterIndex);
                    seriesIndex.add(chapterIndexRoot);
                    chapterIndex = objectMapper.createArrayNode();
                    chapterIndexRoot = objectMapper.createObjectNode();
                }
                chapterIndexRoot.put("chapter_title", el.text());
            } else if (el.className().equals(chapterListElementClassName)) {
                ObjectNode chapter = objectMapper.createObjectNode();
                Element linkEl = el.select("a[href]").get(0);

                chapter.put("chapter_link", linkEl.attr("href"));
                chapter.put("chapter_subtitle", linkEl.text());

                chapterIndex.add(chapter);
            }
        }
        rootNode.set("chapter_index", seriesIndex);
        return rootNode.toString();
    }
}
