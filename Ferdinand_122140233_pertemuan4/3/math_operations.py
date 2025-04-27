# Berisi operasi matematika

# Konstanta
PI = 3.14159

# Fungsi untuk menghitung luas dan keliling bentuk geometri
def luas_persegi(s):
    """Menghitung luas persegi dengan panjang sisi """
    return s * s

def keliling_persegi(s):
    """Menghitung keliling persegi dengan panjang sisi """
    return 4 * s

def luas_persegi_p(p, l):
    """Menghitung luas persegi p dengan panjang dan lebar """
    return p * l

def keliling_persegi_p(p, l):
    """Menghitung keliling persegi panjang dengan panjang dan lebar """
    return 2 * (p + l)

def luas_lingkaran(r):
    """Menghitung luas lingkaran dengan jari-jari """
    return PI * r * r

def keliling_lingkaran(r):
    """Menghitung keliling (panjang busur) lingkaran dengan jari-jari """
    return 2 * PI * r

# Fungsi untuk konversi suhu
def celsius_ke_fahrenheit(celsius):
    """Mengkonversi suhu dari Celsius ke Fahrenheit"""
    return (celsius * 9/5) + 32

def celsius_ke_kelvin(celsius):
    """Mengkonversi suhu dari Celsius ke Kelvin"""
    return celsius + 273.15

def fahrenheit_ke_celsius(fahrenheit):
    """Mengkonversi suhu dari Fahrenheit ke Celsius"""
    return (fahrenheit - 32) * 5/9