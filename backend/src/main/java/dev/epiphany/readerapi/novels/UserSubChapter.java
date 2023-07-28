package dev.epiphany.readerapi.novels;

import dev.epiphany.readerapi.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_subchapter")
public class UserSubChapter {
    @EmbeddedId
    private UserSubChapterId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("subchapterId")
    private SubChapter subChapter;

    @Column(name = "is_read")
    private boolean isRead = false;

    @Column(name = "is_bookmarked")
    private boolean isBookmarked = false;
    public UserSubChapter(User user, SubChapter subChapter){
        this.user = user;
        this.subChapter = subChapter;
        this.id = new UserSubChapterId(user.getId(), subChapter.getId());
    }
}
