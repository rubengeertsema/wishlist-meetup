package nl.demo.wishlist.model;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

/**
 * Created by rubengeertsema on 16/04/2017.
 */
@NoArgsConstructor
@Document(collection = "wishes")
public class Wish {

    @Id @Getter @Setter private String id;
    @Getter @Setter private String title;
    @Getter @Setter private String description;
    @Getter @Setter private Date date;
}
