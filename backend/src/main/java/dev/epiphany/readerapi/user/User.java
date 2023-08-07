package dev.epiphany.readerapi.user;
import dev.epiphany.readerapi.novels.Novel;
import dev.epiphany.readerapi.novels.UserSubChapter;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_user")
public class User implements UserDetails {
    @Id
    @GeneratedValue
    private Integer id;

    @Column(unique = true)
    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @ManyToMany(cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    })
    @JoinTable(
            name = "user_novel",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "novel_id")
    )
    private Set<Novel> novels;

    @OneToMany(
            mappedBy = "user",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<UserSubChapter> subChapters;

    public void addNovel(Novel novel) {
        novels.add(novel);

        for (var chapter : novel.getChapters()){
            for (var subchapter : chapter.getSubchapters()){
                UserSubChapter novelSubChapter = new UserSubChapter(this, subchapter);
                subChapters.add(novelSubChapter);
                subchapter.getUsers().add(novelSubChapter);
            }
        }
    }

    public void removeNovel(Novel novel) {
        novels.remove(novel);
        novel.getUsers().remove(this);

        for (var chapter : novel.getChapters()){
            for (var subchapter : chapter.getSubchapters()){
                for (Iterator<UserSubChapter> iterator = subChapters.iterator(); iterator.hasNext(); ) {
                    UserSubChapter userSubChapter = iterator.next();
                    if (userSubChapter.getUser().equals(this) && userSubChapter.getSubChapter().equals(subchapter)) {
                        iterator.remove();
                        userSubChapter.getSubChapter().getUsers().remove(userSubChapter);
                        userSubChapter.setUser(null);
                        userSubChapter.setSubChapter(null);
                    }
                }
            }
        }

    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
