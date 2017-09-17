package nl.demo.wishlist.repository;

import nl.demo.wishlist.model.Wish;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Created by rubengeertsema on 16/04/2017.
 */
public interface WishListRepository extends MongoRepository<Wish, String> {

    public Page<Wish> findAllByOrderByDateDesc(Pageable pageable);

}
