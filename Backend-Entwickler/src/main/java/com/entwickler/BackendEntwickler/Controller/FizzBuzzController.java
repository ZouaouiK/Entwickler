package com.entwickler.BackendEntwickler.Controller;

import java.util.ArrayList;
import java.util.List;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api")
public class FizzBuzzController {


    @GetMapping(value ="/fizzbuzz/{number}",headers = "Accept=application/json")
    public List<String> getFizzBuzzList(@PathVariable("number") long number){

        List<String> fizzBuzzList = new ArrayList<>();

        for (int i = 1; i <= number; i++){

            if(i % 3 == 0 && i % 5 ==0){

                fizzBuzzList.add("FizzBuzz");

            } else if (i % 3 == 0){

                fizzBuzzList.add("Fizz");

            } else if (i % 5 == 0){

                fizzBuzzList.add("Buzz");

            } else {

                fizzBuzzList.add(String.valueOf(i));

            }

        }

        return fizzBuzzList;

    }

}