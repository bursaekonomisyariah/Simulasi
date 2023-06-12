function formatRupiah(input) {
  var value = input.value;
  // Menghapus karakter selain angka
  value = value.replace(/[^\d]/g, '');

  // Menambahkan titik sebagai pemisah ribuan
  value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  // Menambahkan "IDR " di depan nilai
  value = "Rp " + value;

  // Mengupdate nilai pada input
  input.value = value;
}

function calculate() {
  var hargaBarang = parseInt(document.getElementById('harga-barang').value.replace(/[^\d]/g, ''));
  var uangMuka = parseInt(document.getElementById('uang-muka').value.replace(/[^\d]/g, ''));

  if (isNaN(uangMuka)) {
    uangMuka = 0;
    document.getElementById('uang-muka').value = "Rp 0";
  }

  if (uangMuka > hargaBarang) {
    document.getElementById('result').innerHTML = "Uang Muka tidak boleh melebihi Harga Barang.";
    return;
  }

  var tenor = parseInt(document.getElementById('tenor').value);

  if (isNaN(tenor)) {
    tenor = 0;
  }

  if (tenor > 24) {
    document.getElementById('result').innerHTML = "Tenor tidak boleh lebih dari 24 bulan.";
    return;
  }

  // Validasi harga barang
  if (hargaBarang == 0) {
    alert('Harga barang tidak boleh nol!'); // Menampilkan pesan kesalahan
    return; // Menghentikan perhitungan
  }

  var angsuranPokok = hargaBarang - uangMuka;
  var pokokBulanan = angsuranPokok / tenor;
  var margin = 0.8 * angsuranPokok * tenor / 24; // 80% pertahun 2 tahun
  var marginBulanan = margin / tenor;
  var angsuranBulanan = pokokBulanan + marginBulanan;
  var jumlahAngsuran = angsuranPokok + margin;

  document.getElementById('result').innerHTML = `
    <p>Angsuran Bulanan: ${formatCurrency(angsuranBulanan)}</p>
    <p>Jumlah Angsuran: ${formatCurrency(jumlahAngsuran)}</p>
  `;
}

function formatCurrency(value) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
}
