package nl.demo.wishlist.controller;

import nl.demo.wishlist.dao.WishListDaoImpl;
import nl.demo.wishlist.model.Wish;

import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

/**
 * Created by rubengeertsema on 16/04/2017.
 */
@Controller
@RequestMapping("/api")
public class WishListController {

    private final WishListDaoImpl wishListDao;

    @Autowired
    public WishListController(WishListDaoImpl wishListDao) {
        this.wishListDao = wishListDao;
    }

    @GetMapping
    public ResponseEntity getAll(Pageable pageable) {
        return new ResponseEntity<>(wishListDao.getAll(pageable), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity get(@PathVariable("id") String id) {
        Wish wish = wishListDao.get(id);

        return (wish == null)
                ? new ResponseEntity<>(String.format("No wish found for ID [%s].", id), HttpStatus.NOT_FOUND)
                : new ResponseEntity<>(wish, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity create(@RequestBody Wish wish) {
        return new ResponseEntity<>(wishListDao.create(wish), HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity update(@RequestBody Wish wish) {
        Wish updatedWish = wishListDao.update(wish);

        return (updatedWish == null)
                ? new ResponseEntity<>(String.format("No wish found for ID [%s].", wish.getId()), HttpStatus.NOT_FOUND)
                : new ResponseEntity<>(updatedWish, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable("id") String id) {
        Wish deletedWish = wishListDao.delete(id);

        return (deletedWish == null)
                ? new ResponseEntity<>(String.format("No wish found for ID [%s].", id), HttpStatus.NOT_FOUND)
                : new ResponseEntity<>(deletedWish, HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity deleteAll() {
        wishListDao.deleteAll();
        return new ResponseEntity<>("Deleted all wishes.", HttpStatus.OK);
    }
}
