from abc import ABC, abstractmethod

# Abstract base class representing a general library item
class LibraryItem(ABC):
    def __init__(self, item_id, title, author, year_published):
        self._item_id = item_id  # Protected attribute
        self._title = title      # Protected attribute
        self._author = author    # Protected attribute
        self._year_published = year_published  # Protected attribute

    @abstractmethod
    def display_info(self):
        pass

    # Getter for title (example of encapsulation)
    @property
    def title(self):
        return self._title

    # Setter for title
    @title.setter
    def title(self, value):
        self._title = value


# Subclass representing a book
class Book(LibraryItem):
    def __init__(self, item_id, title, author, year_published, genre):
        super().__init__(item_id, title, author, year_published)
        self._genre = genre  # Protected attribute

    def display_info(self):
        print(f"[Book] ID: {self._item_id}, Title: {self._title}, Author: {self._author}, Year: {self._year_published}, Genre: {self._genre}")


# Subclass representing a magazine
class Magazine(LibraryItem):
    def __init__(self, item_id, title, author, year_published, issue_number):
        super().__init__(item_id, title, author, year_published)
        self._issue_number = issue_number  # Protected attribute

    def display_info(self):
        print(f"[Magazine] ID: {self._item_id}, Title: {self._title}, Author: {self._author}, Year: {self._year_published}, Issue No.: {self._issue_number}")


# Class to manage library items
class Library:
    def __init__(self):
        self.__items = []  # Private attribute to store library items

    def add_item(self, item):
        self.__items.append(item)

    def display_all_items(self):
        print("\nLibrary Collection:")
        for item in self.__items:
            item.display_info()

    def find_item_by_title(self, title):
        print(f"\nSearching for items with title containing '{title}':")
        for item in self.__items:
            if title.lower() in item.title.lower():
                item.display_info()

    def find_item_by_id(self, item_id):
        print(f"\nSearching for item with ID '{item_id}':")
        for item in self.__items:
            if item._item_id == item_id:
                item.display_info()
                return
        print("Item not found.")


# Sample usage
library = Library()
book1 = Book(1, "Laskar Pelangi", "Andrea Hirata", 2005, "Novel")
book2 = Book(2, "Bumi Manusia", "Pramoedya Ananta Toer", 1980, "Sastra")
magazine1 = Magazine(3, "National Geographic Indonesia", "Editorial Team", 2025, 102)

library.add_item(book1)
library.add_item(book2)
library.add_item(magazine1)

library.display_all_items()
library.find_item_by_title("Python")
library.find_item_by_id(2)
