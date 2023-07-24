import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import { HeaderWithBackButton, Gap } from '../components'
import { Colors, Rp } from '../constant'
import { useHookstate } from '@hookstate/core';


const KPRCalculatorScreen = ({ route, navigation}) => {

  const {harga} = route.params;

  const cardState = useHookstate({
    card1: false,
    card2: false,
    card3: false
  })

  const kpr = useHookstate({
    harga: '550000000',
    dp: '50000000',
    tenor: '10',
    bunga: '11',
    total: '4583333',
    pokokKredit: '500000000',
    cicilanPerBulan: '50000000'
  })

  const calcResult = async() => {
    
    kpr.harga.set(harga);
    kpr.dp.set(harga * 0.1)

    hargaProperti       = parseFloat(kpr.harga.get())
    sukuBunga           = parseFloat(kpr.bunga.get()) / 100.0;
    jangkaWatuPinjaman  = parseFloat(kpr.tenor.get());
    let jangkaPinjamanPerBulan = parseFloat(jangkaWatuPinjaman * 12);
    let pokokKredit     = hargaProperti - parseFloat(kpr.dp.get());
    let cicilanPerBulan = (pokokKredit * sukuBunga * jangkaWatuPinjaman) / jangkaPinjamanPerBulan;
    kpr.pokokKredit.set(pokokKredit);
    if( ! isNaN(cicilanPerBulan )) {
      kpr.total.set(cicilanPerBulan)
    }else {
      kpr.total.set(0)
    }
    
    console.log(jangkaPinjamanPerBulan)
  }

  useEffect(() => {
    calcResult()
  })


  return (
    <ScrollView style={styles.container}>
      <Gap height={20}/>
      <HeaderWithBackButton title="Kalkulator KPR" onPress={() => navigation.goBack()}/>
      <Gap height={40}/>
      <View style={{backgroundColor: Colors.light, borderRadius: 10, height: 150, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontWeight:'bold', color: Colors.dark, fontSize: 12}}>Cicilan Perbulan</Text>
        <Gap height={5}/>
        <Text style={{fontWeight: 'bold', fontSize: 24, color: Colors.primary}}>{Rp(kpr.total.get())}</Text>
        <Gap height={5}/>
        <View style={{ flexDirection:'row', alignItems: 'center'}}>
          <Text style={{fontSize: 12, marginRight: 4}}>Jumlah Kredit</Text>
          <Text style={{fontSize: 12, color: Colors.dark}}>{Rp(kpr.pokokKredit.get())}</Text>
        </View>
      </View>
      <Gap height={20}/>
      <View>
        <Text style={styles.formLabel}>Harga Properti</Text>
        <TextInput style={styles.formControl} keyboardType="number-pad"  onChangeText={(text) => {
            if(text === '') {
              kpr.harga.set(0)
              return;
            }
            kpr.harga.set(parseFloat(text))
          }} value={(kpr.harga.get()).toString()} defaultValue={0}/>
      </View>
      <Gap height={20}/>
      <View>
        <Text style={styles.formLabel}>Uang Muka</Text>
        <TextInput style={styles.formControl} keyboardType="number-pad"  onChangeText={(text) => {
            if(text === '') {
              kpr.dp.set(0)
              return;
            }
            kpr.dp.set(parseFloat(text))
          }} value={(kpr.dp.get()).toString()} defaultValue={0}/>
      </View>
      <Gap height={20}/>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{width: '48%'}}>
          <Text style={styles.formLabel}>Jangka Waktu Pinjaman (Tahun)</Text>
          <TextInput style={styles.formControl} keyboardType="number-pad" onChangeText={(text) => {
            if(text === '') {
              kpr.tenor.set(0)
              return;
            }
            kpr.tenor.set(parseFloat(text))
          }} value={(kpr.tenor.get()).toString()} defaultValue={0}/>
        </View>
        <View style={{width: '48%'}}>
          <Text style={styles.formLabel}>Suku Bunga (%)</Text>
          <TextInput style={styles.formControl} keyboardType="number-pad" onChangeText={(text) => {
            
            if(text === '') {
              kpr.bunga.set(0)
              return;
            }

            kpr.bunga.set(parseFloat(text))
          }} value={(kpr.bunga.get()).toString()} defaultValue={0}/>
        </View>
      </View>
      <Gap height={20}/>
      <TouchableOpacity onPress={() => calcResult()}>
        <Text style={styles.btnPrimary}>Hitung KPR</Text>
      </TouchableOpacity>
      <Gap height={20}/>
      <View style={{ backgroundColor: '#efefef', padding: 16, borderRadius: 10 }}>
        <Text style={{fontWeight: 'bold', color: Colors.dark}} onPress={() => cardState.card1.set(!cardState.card1.get())}>Cara Melakukan simulasi KPR</Text>
        {
          cardState.card1.get() 
          ? <View>
              <Gap height={8}/>
              <Text style={{color: '#222', lineHeight: 24}}>
              Simulasi KPR menggunakan kalkulator KPR PT. Sava Jakarta Properti akan membantu Anda mendapatkan perkiraan cicilan KPR bulanan untuk rumah idnya, besarnya total cicilan bulanan Anda tidak lebih besar dari 35% penghasilan per bulan Anda. Untuk menghitung besarnya kredit rumah yang ideal disesuaikan dengan penghasilan bulanan, Anda bisa menghitungnya lewat Kalkulator Keterjangkauan.
              
              Cara menggunakan Kalkulator KPR ini mudah. Anda hanya perlu mengisi tiga indikator:

              Jumlah pinjaman. Anda bisa menghitungnya dari harga rumah dikurangi uang muka yang sudah Anda bayar. Misalnya, harga rumah Rp350 juta dan Anda sudah membayar DP 15% atau Rp52,5 juta, maka jumlah pinjaman yang harus diisi adalah Rp297,5 juta.
              Suku bunga. Saat ini, suku bunga KPR berkisar pada 7,5% hingga 12%.
              JJangka waktu pinjaman. Saat ini, maksimal jangka waktu pinjaman adalah 30 tahun.
              Pada bagian ringkasan, yang perlu diperhatikan adalah:

              Nilai pokok pinjaman awal.
              Nilai bunga pinjaman awal.
              Pinjaman per bulan. Ini adalah total cicilan yang harus Anda bayar setiap bulannya.
              Total pinjaman. Total jumlah pinjaman ditambah bunga yang telah diakumulasikan selama masa waktu kredit rumah.
              Total bunga pinjaman. Total bunga yang telah diakumulasikan selama masa waktu cicilan.
              Hal lain yang perlu diperhatikan dalam Kalkulator KPR adalah bank biasanya menawarkan bunga fix selama beberapa tahun awal. Ini artinya bunga selama periode tersebut tetap, tidak berubah. Selanjutnya, Anda akan memasuki periode bunga floating. Bunga KPR floating artinya jumlah bunga berubah sesuai perkembangan ekonomi nasional. Bisa naik, bisa turun. Kalkulator KPR ini merupakan simulasi kredit rumah, bukan sebagai acuan harga dan cicilan sebenarnya. Harga dan cicilan sebenarnya akan ditentukan oleh penjual dan bank pemberi pinjaman KPR rumah. Setelah mengetahui hitungan kredit rumah dengan Kalkulator KPR, langkah tepat selanjutnya yang harus dilakukan adalah memahami prosedur maupun cara mengajukan KPR dengan menyimak Panduan Mengajukan KPR.</Text>
            </View>
          : <></>
        }
        
      </View>
      <Gap height={20}/>

      <View style={{ backgroundColor: Colors.light, padding: 16, borderRadius: 10 }}>
        <Text style={{fontWeight: 'bold', color: Colors.dark}}  onPress={() => cardState.card2.set(!cardState.card2.get())}>Perhitungan KPR</Text>
        {
          cardState.card2.get() 
          ? <View>
              <Gap height={8}/>
              <Text style={{color: '#222', lineHeight: 24}}>
              Melakukan Perhitungan KPR (Kredit Pemilikan Rumah) memerlukan kehati-hatian. Salah perhitungan, cicilan KPR rumah bisa macet dan akhirnya rumah disita bank. Untuk itu, jika masih ragu terhadap rencana mengajukan rumah KPR, silakan ajukan pertanyaan melalui Tanya Properti di PT. Sava Jakarta Properti.

                Pada umumnya, bank mematok kredit rumah per bulan tak lebih dari 35% dari total penghasilan (suami dan istri). Kebijakan ini diambil demi kepentingan nasabah sendiri, agar sisa penghasilan bisa digunakan untuk keperluan hidup lain.

                Perhitungan KPR rumah didasarkan pada besarnya uang muka dan jangka waktu KPR. Bila ingin mendapat plafon kredit tinggi dengan kredit rumah yang rendah, bayarlah uang muka dengan nilai besar. Asumsinya—dengan jangka waktu tetap—makin besar uang muka makin kecil pula kredit rumahnya.

                Sebaiknya, jika tak mampu membayar uang muka dengan jumlah besar, agar kredit rumah tetap rendah, pilihlah KPR dengan jangka waktu panjang.

                Tetapi perlu diingat, semakin panjang jangka waktu cicilan, makin banyak pula uang yang harus Anda bayarkan. Semakin akurat perhitungan KPR rumah Anda, semakin ringan upaya Anda memiliki rumah. Agar semakin paham proses pembelian kredit rumah, membaca tips dan trik di Panduan PT. Sava Jakarta Properti sangat berguna untuk Anda.

                Simulasi KPR
                Misalnya, nilai KPR yang hendak diajukan Rp150 juta dengan bunga efektif 12% per tahun. Jika Anda mengambil KPR berjangka waktu lima tahun, Anda perlu mencicil pinjaman pokok ditambah bunga sebesar Rp3.336.667 per bulan.

                Berdasarkan hitungan Kalkulator KPR, ini berarti total uang yang harus Anda setor ke bank sebesar Rp3.336.667 x 60 bulan = Rp200.200.020. Apabila jangka waktu kredit diperpanjang menjadi 10 tahun, cicilan per bulan hanya sekitar Rp2.152.064.

                Dengan mengetahui simulasi KPR dan perhitungan KPR rumah yang tepat, Anda dapat mengambil keputusan sendiri jangka waktu pembayaran kredit rumah tersebut.

                Akan lebih baik jika Anda bersedia mengencangkan ikat pinggang selama jangka waktu tertentu untuk mendapatkan hitungan matematis yang lebih hemat dalam memilih produk dan skema kredit rumah.

                Ada beberapa hal lain yang harus diingat. Pada awal transaksi, selain menyiapkan pembayaran atas uang muka, Anda juga harus memperhitungkan ongkos-ongkos lain, seperti cicilan KPR rumah pada bulan pertama, pajak, biaya notaris, provisi, kredit, asuransi, hingga bea balik nama yang tentunya berjumlah tidak sedikit.

                Satu hal lain yang tak kalah penting diingat, pastikan rumah yang ingin dibeli sudah memenuhi syarat sebagai hunian yang ideal bagi keluarga. Caranya, dengan menyimak Review Properti di PT. Sava Jakarta Properti, yang membahas seluk beluk berbagai properti di kota-kota besar di Indonesia.
              </Text>
            </View>
          : <></>
        }
      </View>
      <Gap height={20}/>

      <View style={{ backgroundColor: Colors.light, padding: 16, borderRadius: 10 }}>
        <Text style={{fontWeight: 'bold', color: Colors.dark}} onPress={() => cardState.card3.set(!cardState.card3.get())}>Syarat KPR</Text>
        {
          cardState.card3.get() 
          ? <View>
              <Gap height={8}/>
              <Text style={{color: '#222', lineHeight: 24}}>Setelah Anda melakukan simulasi kredit rumah, kini saatnya memahami syarat-syarat yang diperlukan untuk mengajukan KPR. Agar permohonan kredit tidak ditolak oleh bank, sebaiknya kenali dulu syarat mengajukan KPR berikut ini.</Text>
              <Gap height={8}/>
              <Text style={{color: '#222', lineHeight: 24}}>1. WNI dan berdomisili di Indonesia</Text>
              <Text style={{color: '#222', lineHeight: 24}}>2. Telah berusia 21 tahun atau telah menikah</Text>
              <Text style={{color: '#222', lineHeight: 24}}>3. Memiliki pekerjaan dan penghasilan tetap sebagai pegawai tetap/ wiraswasta/ profesional dengan masa kerja/usaha minimal 1 tahun</Text>
              <Text style={{color: '#222', lineHeight: 24}}>4. Memiliki NPWP Pribadi</Text>
            </View>
          : <></>
        }
      </View>
      
      <Gap height={40}/>

    </ScrollView>
  )
}

export default KPRCalculatorScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 16
  },
  formLabel: {
    fontSize: 12,
    color: Colors.dark,
    fontWeight: 'bold',
    marginBottom: 5
  },
  formControl: {
    borderColor: Colors.muted,
    borderRadius: 10,
    backgroundColor: Colors.light,
    color: Colors.dark,
    paddingHorizontal: 16,
    height: 40
  },
  btnPrimary: {
    backgroundColor: Colors.primary,
    color: Colors.white,
    height: 40,
    lineHeight: 40,
    textAlign: 'center',
    borderRadius: 10
  }
 
})