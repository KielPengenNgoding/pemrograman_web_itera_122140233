def hitung_bmi():
    print("=== BMI CALCULATOR ===")
    print("----------------------")

    try:
        # Meminta input berat dan tinggi dari pengguna
        berat = float(input("Masukkan berat badan (kg): "))
        tinggi = float(input("Masukkan tinggi badan (m): "))

        # Validasi input
        if berat <= 0 or tinggi <= 0:
            print("Error: Berat badan dan tinggi badan harus lebih besar dari nol!")
            return

        # Menghitung nilai BMI
        bmi = berat / (tinggi ** 2)

        # Menentukan kategori berdasarkan nilai BMI
        if bmi < 18.5:
            status = "Kekurangan berat badan"
        elif bmi < 25:
            status = "Berat badan ideal"
        elif bmi < 30:
            status = "Kelebihan berat badan"
        else:
            status = "Obesitas"

        # Menampilkan hasil
        print("\n=== HASIL BMI ===")
        print(f"Nilai BMI Anda: {bmi:.2f}")
        print(f"Status: {status}")

    except ValueError:
        print("Error: Input tidak valid. Harap masukkan angka!")

# Menjalankan program
if __name__ == "__main__":
    hitung_bmi()
