

# Import seluruh modul
import math_operations

# Import fungsi tertentu secara langsung
from math_operations import luas_lingkaran, keliling_lingkaran, celsius_ke_fahrenheit

def main():
    print("PROGRAM OPERASI MATEMATIKA")
    print("=========================")
    
    # Bentuk Geometri 
    print("\n--- Perhitungan Bentuk Geometri ---")
    
    # Persegi
    s = 5
    print(f"\nPersegi dengan sisi = {s}")
    print(f"Luas = {math_operations.luas_persegi(s)}")
    print(f"Keliling = {math_operations.keliling_persegi(s)}")
    
    # Persegi p
    p, l = 8, 4
    print(f"\nPersegi p dengan panjang = {p}, lebar = {l}")
    print(f"Luas = {math_operations.luas_persegi_p(p, l)}")
    print(f"Keliling = {math_operations.keliling_persegi_p(p, l)}")
    
    # Lingkaran (menggunakan import cara 2)
    r = 7
    print(f"\nLingkaran dengan jari-jari = {r}")
    print(f"Luas = {luas_lingkaran(r):.2f}")
    print(f"Keliling = {keliling_lingkaran(r):.2f}")
    print(f"Nilai PI yang digunakan = {math_operations.PI}")
    
    # Konversi Suhu 
    print("\n--- Konversi Suhu ---")
    
    # Celsius ke Fahrenheit (menggunakan import cara 2)
    celsius = 25
    print(f"\nSuhu {celsius}°C = {celsius_ke_fahrenheit(celsius):.2f}°F")
    
    # Celsius ke Kelvin
    print(f"Suhu {celsius}°C = {math_operations.celsius_ke_kelvin(celsius):.2f}K")
    
    # Fahrenheit ke Celsius
    fahrenheit = 98.6
    print(f"Suhu {fahrenheit}°F = {math_operations.fahrenheit_ke_celsius(fahrenheit):.2f}°C")

if __name__ == "__main__":
    main()