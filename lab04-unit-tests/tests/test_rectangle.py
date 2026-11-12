"""Проверка формул для rectangle. Исходный модуль не изменяется."""
import unittest
import math
import rectangle


class TestRectangle(unittest.TestCase):
    def test_area_different_sides(self):
        actual = rectangle.area(3, 5)
        self.assertAlmostEqual(actual, 15, places=7)

    def test_area_equal_sides(self):
        actual = rectangle.area(4, 4)
        self.assertAlmostEqual(actual, 16, places=7)

    def test_area_fraction(self):
        actual = rectangle.area(2.5, 1.2)
        self.assertAlmostEqual(actual, 3, places=7)

    def test_area_zero_side(self):
        actual = rectangle.area(0, 5)
        self.assertAlmostEqual(actual, 0, places=7)

    def test_perimeter_different_sides(self):
        actual = rectangle.perimeter(3, 5)
        self.assertAlmostEqual(actual, 16, places=7)

    def test_perimeter_equal_sides(self):
        actual = rectangle.perimeter(4, 4)
        self.assertAlmostEqual(actual, 16, places=7)

    def test_perimeter_fraction(self):
        actual = rectangle.perimeter(2.5, 1.2)
        self.assertAlmostEqual(actual, 7.4, places=7)

    def test_perimeter_zero_side(self):
        actual = rectangle.perimeter(0, 5)
        self.assertAlmostEqual(actual, 10, places=7)


if __name__ == "__main__":
    unittest.main()
