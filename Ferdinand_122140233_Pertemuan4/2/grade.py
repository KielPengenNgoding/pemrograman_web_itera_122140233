def sistem_pengelolaan_nilai():
    print("=== APLIKASI PENGELOLAAN NILAI MAHASISWA ===")
    print("--------------------------------------------")

    # Data mahasiswa: nama, NIM, nilai UTS, UAS, dan tugas
    data_mahasiswa = [
        {"nama": "Ferdinand Yehezkiel", "nim": "122140233", "uts": 85, "uas": 90, "tugas": 88},
        {"nama": "Zidan Raihan ", "nim": "122140100", "uts": 88, "uas": 82, "tugas": 70},
        {"nama": "Ihya Razky ", "nim": "122140169", "uts": 65, "uas": 70, "tugas": 75},
        {"nama": "Arief Rahman", "nim": "122140083", "uts": 75, "uas": 55, "tugas": 82},
        {"nama": "Sulthan Fatih", "nim": "122140183", "uts": 45, "uas": 55, "tugas": 60}
    ]

    # Hitung nilai akhir dan tentukan grade
    for mhs in data_mahasiswa:
        akhir = (0.3 * mhs["uts"]) + (0.4 * mhs["uas"]) + (0.3 * mhs["tugas"])
        mhs["nilai_akhir"] = akhir

        if akhir >= 80:
            mhs["grade"] = "A"
        elif akhir >= 70:
            mhs["grade"] = "B"
        elif akhir >= 60:
            mhs["grade"] = "C"
        elif akhir >= 50:
            mhs["grade"] = "D"
        else:
            mhs["grade"] = "E"

    # Cetak tabel nilai mahasiswa
    print("\nDAFTAR NILAI MAHASISWA")
    print("-" * 85)
    print(f"{'NO':<3} | {'NIM':<10} | {'NAMA':<20} | {'UTS':^5} | {'UAS':^5} | {'TUGAS':^5} | {'AKHIR':^6} | {'GRADE':^5}")
    print("-" * 85)

    for i, mhs in enumerate(data_mahasiswa, start=1):
        print(f"{i:<3} | {mhs['nim']:<10} | {mhs['nama']:<20} | "
              f"{mhs['uts']:^5} | {mhs['uas']:^5} | {mhs['tugas']:^5} | "
              f"{mhs['nilai_akhir']:^6.2f} | {mhs['grade']:^5}")

    print("-" * 85)

    # Cari mahasiswa dengan nilai tertinggi dan terendah
    terbaik = max(data_mahasiswa, key=lambda x: x["nilai_akhir"])
    terburuk = min(data_mahasiswa, key=lambda x: x["nilai_akhir"])

    # Tampilkan mahasiswa terbaik
    print("\nMAHASISWA DENGAN NILAI TERTINGGI")
    print(f"Nama        : {terbaik['nama']}")
    print(f"NIM         : {terbaik['nim']}")
    print(f"Nilai Akhir : {terbaik['nilai_akhir']:.2f}")
    print(f"Grade       : {terbaik['grade']}")

    # Tampilkan mahasiswa terburuk
    print("\nMAHASISWA DENGAN NILAI TERENDAH")
    print(f"Nama        : {terburuk['nama']}")
    print(f"NIM         : {terburuk['nim']}")
    print(f"Nilai Akhir : {terburuk['nilai_akhir']:.2f}")
    print(f"Grade       : {terburuk['grade']}")

# Eksekusi program utama
if __name__ == "__main__":
    sistem_pengelolaan_nilai()
