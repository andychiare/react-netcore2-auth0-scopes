using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;

namespace APIAuth0.Controllers
{
    [Route("api/[controller]")]
    public class BooksController : Controller
    {
        private static List<Book> bookList = new List<Book>() {
                new Book { Author = "Ray Bradbury", Title = "Fahrenheit 451", AgeRestriction = false },
                new Book { Author = "Gabriel García Márquez", Title = "One Hundred years of Solitude", AgeRestriction = false },
                new Book { Author = "George Orwell", Title = "1984", AgeRestriction = false },
                new Book { Author = "Anais Nin", Title = "Delta of Venus", AgeRestriction = true }
            };

        [HttpGet, Authorize("read:books")]
        public IEnumerable<Book> Get()
        {
            return bookList;
        }

        [HttpPost, Authorize("write:books")]
        public void Post([FromBody] Book book)
        {
            bookList.Add(book);
        }

        public class Book
        {
            public string Author { get; set; }
            public string Title { get; set; }
            public bool AgeRestriction { get; set; }
        }
    }
}
