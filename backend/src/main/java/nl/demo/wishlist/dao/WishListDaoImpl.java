package nl.demo.wishlist.dao;

import nl.demo.wishlist.model.Wish;
import nl.demo.wishlist.repository.WishListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * Created by rubengeertsema on 17/04/2017.
 */
@Component
public class WishListDaoImpl implements WishListDao {

    private final WishListRepository wishListRepository;

    @Autowired
    public WishListDaoImpl(WishListRepository wishListRepository) {
        this.wishListRepository = wishListRepository;
    }

    @Override
    public Page<Wish> getAll(Pageable pageable) {
        return wishListRepository.findAllByOrderByDateDesc(pageable);
    }

    @Override
    public Wish get(String id) {
        return wishListRepository.findOne(id);
    }

    @Override
    public Wish create(Wish wish) {
        wish.setDate(new Date());
        return wishListRepository.save(wish);
    }

    @Override
    public Wish update(Wish wish) {
        Wish updated = null;

        Wish toBeUpdated = wishListRepository.findOne(wish.getId());
        if (toBeUpdated != null) {
            toBeUpdated.setTitle(wish.getTitle());
            toBeUpdated.setDescription(wish.getDescription());
            toBeUpdated.setDate(new Date());
            updated = wishListRepository.save(toBeUpdated);
        }

        return updated;
    }

    @Override
    public Wish delete(String id) {
        Wish deleted = null;

        Wish toBeDeleted = wishListRepository.findOne(id);
        if (toBeDeleted != null) {
            wishListRepository.delete(toBeDeleted);
            deleted = toBeDeleted;
        }

        return deleted;
    }

    @Override
    public void deleteAll() {
        wishListRepository.deleteAll();
    }
}
