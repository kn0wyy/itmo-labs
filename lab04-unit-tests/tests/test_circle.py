"""Проверка формул для circle. Исходный модуль не изменяется."""
import unittest
import math
import circle


class TestCircle(unittest.TestCase):
    def test_area_unit(self):
        actual = circle.area(1)
        self.assertAlmostEqual(actual, math.pi, places=7)

    def test_area_integer(self):
        actual = circle.area(3)
        self.assertAlmostEqual(actual, 9 * math.pi, places=7)

    def test_area_fraction(self):
        actual = circle.area(0.5)
        self.assertAlmostEqual(actual, math.pi / 4, places=7)

    def test_area_zero(self):
        actual = circle.area(0)
        self.assertAlmostEqual(actual, 0, places=7)

    def test_perimeter_unit(self):
        actual = circle.perimeter(1)
        self.assertAlmostEqual(actual, 2 * math.pi, places=7)

    def test_perimeter_integer(self):
        actual = circle.perimeter(3)
        self.assertAlmostEqual(actual, 6 * math.pi, places=7)

    def test_perimeter_fraction(self):
        actual = circle.perimeter(0.5)
        self.assertAlmostEqual(actual, math.pi, places=7)

    def test_perimeter_zero(self):
        actual = circle.perimeter(0)
        self.assertAlmostEqual(actual, 0, places=7)


if __name__ == "__main__":
    unittest.main()
