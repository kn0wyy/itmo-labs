"""Печатает результаты вызовов для ручного сравнения с таблицей CORRECT_ANSWER.md."""
import circle
import square
import rectangle
import triangle

print("circle.area(3) =", circle.area(3))
print("circle.perimeter(3) =", circle.perimeter(3))
print("square.area(4) =", square.area(4))
print("square.perimeter(4) =", square.perimeter(4))
print("rectangle.area(3, 5) =", rectangle.area(3, 5))
print("rectangle.perimeter(3, 5) =", rectangle.perimeter(3, 5))
print("triangle.area(6, 4) =", triangle.area(6, 4))
print("triangle.perimeter(3, 4, 5) =", triangle.perimeter(3, 4, 5))
