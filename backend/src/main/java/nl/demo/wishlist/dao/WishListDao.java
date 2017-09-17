package nl.demo.wishlist.dao;

import nl.demo.wishlist.model.Wish;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Created by rubengeertsema on 17/04/2017.
 */
public interface WishListDao {

    public Wish get(String id);

    public Wish create(Wish wish);

    public Wish update(Wish wish);

    public Wish delete(String id);

    public Page<Wish> getAll(Pageable pageable);

    public void deleteAll();

}
