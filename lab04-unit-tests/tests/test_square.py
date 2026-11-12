"""Проверка формул для square. Исходный модуль не изменяется."""
import unittest
import math
import square


class TestSquare(unittest.TestCase):
    def test_area_unit(self):
        actual = square.area(1)
        self.assertAlmostEqual(actual, 1, places=7)

    def test_area_integer(self):
        actual = square.area(4)
        self.assertAlmostEqual(actual, 16, places=7)

    def test_area_fraction(self):
        actual = square.area(2.5)
        self.assertAlmostEqual(actual, 6.25, places=7)

    def test_area_zero(self):
        actual = square.area(0)
        self.assertAlmostEqual(actual, 0, places=7)

    def test_perimeter_unit(self):
        actual = square.perimeter(1)
        self.assertAlmostEqual(actual, 4, places=7)

    def test_perimeter_integer(self):
        actual = square.perimeter(4)
        self.assertAlmostEqual(actual, 16, places=7)

    def test_perimeter_fraction(self):
        actual = square.perimeter(2.5)
        self.assertAlmostEqual(actual, 10, places=7)

    def test_perimeter_zero(self):
        actual = square.perimeter(0)
        self.assertAlmostEqual(actual, 0, places=7)


if __name__ == "__main__":
    unittest.main()
