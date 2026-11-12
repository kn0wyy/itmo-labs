"""Проверка формул для triangle. Исходный модуль не изменяется."""
import unittest
import math
import triangle


class TestTriangle(unittest.TestCase):
    def test_area_integer(self):
        actual = triangle.area(6, 4)
        self.assertAlmostEqual(actual, 12, places=7)

    def test_area_unit(self):
        actual = triangle.area(1, 1)
        self.assertAlmostEqual(actual, 0.5, places=7)

    def test_area_fraction(self):
        actual = triangle.area(2.5, 1.2)
        self.assertAlmostEqual(actual, 1.5, places=7)

    def test_area_zero_height(self):
        actual = triangle.area(6, 0)
        self.assertAlmostEqual(actual, 0, places=7)

    def test_perimeter_right(self):
        actual = triangle.perimeter(3, 4, 5)
        self.assertAlmostEqual(actual, 12, places=7)

    def test_perimeter_equilateral(self):
        actual = triangle.perimeter(2, 2, 2)
        self.assertAlmostEqual(actual, 6, places=7)

    def test_perimeter_fraction(self):
        actual = triangle.perimeter(1.5, 2, 2.5)
        self.assertAlmostEqual(actual, 6, places=7)

    def test_perimeter_small(self):
        actual = triangle.perimeter(0.3, 0.4, 0.5)
        self.assertAlmostEqual(actual, 1.2, places=7)


if __name__ == "__main__":
    unittest.main()
