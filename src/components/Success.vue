<template>
    <div class="mainDiv">
        <div style="text-align:center;margin-bottom: 30px;">
            <h2>满文识别结果</h2>
        </div>

        <div class="show">
            <div id="preview">
                <img :src="imgSource" />
            </div>
            <canvas id="canvas"></canvas>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isSuccess: false,
            data: [],
            imgRatio: 0.6,
            resultRatio: 0.7,
            handleFile: undefined,
            file: null,
            imgSource: undefined,
            width: 0,
            height: 0
        }
    },
    mounted() {
        this.isSuccess = this.$route.query.isSuccess
        this.handleFile = this.$route.query.handleFile
        let img_blob = this.dataURLtoBlob(this.handleFile)
        let filename = this.$route.query.filename
        this.file = this.blobToFile(img_blob, filename)
        let result = this.$route.query.result
        this.data = result
        let data_1 = [{ 'position': '46,182,65,142', 'result_1': 'burubure', 'result_2': 'budobuda' }, { 'position': '232,300,65,142', 'result_1': 'de', 'result_2': 'de' }, { 'position': '352,532,65,142', 'result_1': 'isinarakū', 'result_2': 'isinarakū' }, { 'position': '586,708,65,142', 'result_1': 'obuha', 'result_2': 'obuka' }, { 'position': '793,863,65,142', 'result_1': 'ere', 'result_2': 'eden' }, { 'position': '43,174,164,240', 'result_1': 'cohome', 'result_2': 'cokome' }, { 'position': '205,311,164,240', 'result_1': 'mafari', 'result_2': 'mafari' }, { 'position': '343,455,164,240', 'result_1': 'erdemu', 'result_2': 'erdamu' }, { 'position': '541,664,164,240', 'result_1': 'sekiyen', 'result_2': 'slkiyan' }, { 'position': '695,777,164,240', 'result_1': 'yeyen', 'result_2': 'eyan' }, { 'position': '809,864,164,240', 'result_1': 'be', 'result_2': 'bei' }, { 'position': '45,204,264,342', 'result_1': 'iletulere', 'result_2': 'iletullda' }, { 'position': '248,357,264,342', 'result_1': 'dulehe', 'result_2': 'dolehi' }, { 'position': '378,433,264,342', 'result_1': 'be', 'result_2': 'bi' }, { 'position': '454,609,264,342', 'result_1': 'ginggulere', 'result_2': 'hinggulera' }, { 'position': '632,731,264,342', 'result_1': 'šumin', 'result_2': 'sumin' }, { 'position': '752,863,264,342', 'result_1': 'gūnin', 'result_2': 'ū' }, { 'position': '43,119,365,424', 'result_1': 'kni', 'result_2': 'kai' }, { 'position': '270,342,365,424', 'result_1': 'ging', 'result_2': 'ginii' }, { 'position': '389,501,365,424', 'result_1': 'bithe', 'result_2': 'bithi' }, { 'position': '546,607,365,424', 'result_1': 'de', 'result_2': 'de' }, { 'position': '662,841,365,424', 'result_1': 'henduhengge', 'result_2': 'henduhengi' }, { 'position': '44,168,464,531', 'result_1': 'niyalmai', 'result_2': 'iyalmai' }, { 'position': '197,244,464,531', 'result_1': 'šu', 'result_2': 'su' }, { 'position': '271,325,464,531', 'result_1': 'be', 'result_2': 'bi' }, { 'position': '348,472,464,531', 'result_1': 'tuwame', 'result_2': 'tuwame' }, { 'position': '524,643,464,531', 'result_1': 'abkai', 'result_2': 'abkai' }, { 'position': '669,782,464,531', 'result_1': 'fejergi', 'result_2': 'denjeargi' }, { 'position': '809,863,464,531', 'result_1': 'be', 'result_2': 'bei' }, { 'position': '45,155,565,633', 'result_1': 'wembume', 'result_2': 'deambume' }, { 'position': '204,411,565,633', 'result_1': 'hūwašabumbi', 'result_2': 'ūwašabumbi' }, { 'position': '460,566,565,633', 'result_1': 'sehebi', 'result_2': 'sehbi' }, { 'position': '647,687,565,633', 'result_1': 'i', 'result_2': 'bai' }, { 'position': '757,862,565,633', 'result_1': 'mafari', 'result_2': 'mafari' }, { 'position': '45,162,663,741', 'result_1': 'dukjin', 'result_2': 'dokejin' }, { 'position': '214,403,663,741', 'result_1': 'toktobuha', 'result_2': 'toktobuka' }, { 'position': '455,555,663,741', 'result_1': 'amba', 'result_2': 'ambi' }, { 'position': '609,744,663,741', 'result_1': 'bodogon', 'result_2': 'bodonon' }, { 'position': '796,864,663,741', 'result_1': 'de', 'result_2': 'de' }, { 'position': '45,198,766,843', 'result_1': 'gingguleme', 'result_2': 'ginghulem' }, { 'position': '220,355,766,843', 'result_1': 'acabume', 'result_2': 'acabumy' }, { 'position': '401,493,766,843', 'result_1': 'gurun', 'result_2': 'gudon' }, { 'position': '516,572,766,843', 'result_1': 'too', 'result_2': 'boo' }, { 'position': '595,663,766,843', 'result_1': 'de', 'result_2': 'de' }, { 'position': '687,786,766,843', 'result_1': 'hergen', 'result_2': 'hrgen' }, { 'position': '809,863,766,843', 'result_1': 'be', 'result_2': 'bei' }, { 'position': '44,111,864,933', 'result_1': 'emu', 'result_2': 'emu' }, { 'position': '150,258,864,933', 'result_1': 'obure', 'result_2': 'obude' }, { 'position': '299,420,864,933', 'result_1': 'wesihun', 'result_2': 'desihun' }, { 'position': '461,564,864,933', 'result_1': 'kooli', 'result_2': 'ooli' }, { 'position': '605,659,864,933', 'result_1': 'be', 'result_2': 'bi\ni' }, { 'position': '697,849,864,933', 'result_1': 'siohu', 'result_2': 'siokape' }, { 'position': '45,148,963,1040', 'result_1': 'kiceme', 'result_2': 'kidame' }, { 'position': '191,308,963,1040', 'result_1': 'ududu', 'result_2': 'udodu' }, { 'position': '330,429,963,1040', 'result_1': 'aniya', 'result_2': 'anya' }, { 'position': '449,534,963,1040', 'result_1': 'ofi', 'result_2': 'oi' }, { 'position': '554,648,963,1040', 'result_1': 'teni', 'result_2': 'teni' }, { 'position': '670,773,963,1040', 'result_1': 'gulhun', 'result_2': 'golhun' }, { 'position': '794,862,963,1040', 'result_1': 'onhi', 'result_2': 'yoyi' }, { 'position': '45,154,1065,1141', 'result_1': 'obume', 'result_2': 'obume' }, { 'position': '183,373,1065,1141', 'result_1': 'šanggabuha', 'result_2': 'sanglgabuka' }, { 'position': '434,503,1065,1141', 'result_1': 'ere', 'result_2': 'eden' }, { 'position': '531,643,1065,1141', 'result_1': 'bithe', 'result_2': 'bithi' }, { 'position': '670,725,1065,1141', 'result_1': 'be', 'result_2': 'bi' }, { 'position': '751,865,1065,1141', 'result_1': 'tacire', 'result_2': 'tacidu' }];
        let data_2 = [{ 'position': '77,155,17,59', 'result_1': 'duier', 'result_2': 'coolo' }, { 'position': '164,236,17,59', 'result_1': 'j', 'result_2': 'looo' }, { 'position': '259,318,17,59', 'result_1': 'to', 'result_2': 'cytl' }, { 'position': '328,370,17,59', 'result_1': 'je', 'result_2': 'ccyi' }, { 'position': '375,473,17,59', 'result_1': 'tchr', 'result_2': 'lcol' }, { 'position': '484,549,17,59', 'result_1': 'thho', 'result_2': 'doooo' }, { 'position': '562,616,17,59', 'result_1': 't', 'result_2': 'dooco' }, { 'position': '79,119,75,120', 'result_1': 'j', 'result_2': 'cl' }, { 'position': '133,192,75,120', 'result_1': 'c', 'result_2': 'coo' }, { 'position': '204,258,75,120', 'result_1': 'tc', 'result_2': 'ycyl' }, { 'position': '268,314,75,120', 'result_1': 'c', 'result_2': 'ršyl' }, { 'position': '322,344,75,120', 'result_1': 'j', 'result_2': 'yyy' }, { 'position': '360,396,75,120', 'result_1': 't', 'result_2': 'šy' }, { 'position': '405,498,75,120', 'result_1': 'thguulue', 'result_2': 'dooooolo' }, { 'position': '55,196,133,178', 'result_1': 'tilcoo', 'result_2': 'poooooo' }, { 'position': '203,279,133,178', 'result_1': 'tak', 'result_2': 'coololo' }, { 'position': '281,372,133,178', 'result_1': 'dusišbure', 'result_2': 'doooolo' }, { 'position': '376,428,133,178', 'result_1': 'tū', 'result_2': 'yyyl' }, { 'position': '438,487,133,178', 'result_1': 'j', 'result_2': 'cyy' }, { 'position': '501,543,133,178', 'result_1': 'j', 'result_2': 'ci' }, { 'position': '552,628,133,178', 'result_1': 'jr', 'result_2': 'coooo' }, { 'position': '54,112,250,296', 'result_1': 'tū', 'result_2': 'ooooo' }, { 'position': '132,173,250,296', 'result_1': 'j', 'result_2': 'ccyy' }, { 'position': '189,243,250,296', 'result_1': 't', 'result_2': 'locoo' }, { 'position': '261,347,250,296', 'result_1': 'fo', 'result_2': 'cooo' }, { 'position': '366,449,250,296', 'result_1': 'tū', 'result_2': 'colo' }, { 'position': '471,515,250,296', 'result_1': 'j', 'result_2': 'yyyl' }, { 'position': '540,622,250,296', 'result_1': 'tbden', 'result_2': 'doolo' }, { 'position': '78,134,309,350', 'result_1': 't', 'result_2': 'coooo' }, { 'position': '151,222,309,350', 'result_1': 'jooto', 'result_2': 'colo' }, { 'position': '239,284,309,350', 'result_1': 'j', 'result_2': 'cyy' }, { 'position': '330,371,309,350', 'result_1': 'j', 'result_2': 'ryyy' }, { 'position': '401,442,309,350', 'result_1': 'j', 'result_2': 'cyyu' }, { 'position': '479,531,309,350', 'result_1': '', 'result_2': 'dloo' }, { 'position': '567,611,309,350', 'result_1': 'j', 'result_2': 'cyyi' }, { 'position': '77,148,383,424', 'result_1': 'juc', 'result_2': 'coolo' }, { 'position': '162,204,383,424', 'result_1': 'j', 'result_2': 'ccyy' }, { 'position': '220,310,383,424', 'result_1': 'tkolo', 'result_2': 'loocoooo' }, { 'position': '326,381,383,424', 'result_1': 'j', 'result_2': 'coclo' }, { 'position': '392,459,383,424', 'result_1': 'tcoe', 'result_2': 'coolo' }, { 'position': '463,520,383,424', 'result_1': 't', 'result_2': 'co' }, { 'position': '538,616,383,424', 'result_1': 'oic', 'result_2': 'coolo' }, { 'position': '78,150,439,479', 'result_1': 'tcū', 'result_2': 'coo' }, { 'position': '160,270,439,479', 'result_1': 'oošoo', 'result_2': 'loooooo' }, { 'position': '289,403,439,479', 'result_1': 'ccictcfcfū', 'result_2': 'cooo' }, { 'position': '405,467,439,479', 'result_1': 't', 'result_2': 'coooo' }, { 'position': '484,537,439,479', 'result_1': 't', 'result_2': 'cyyl' }, { 'position': '556,612,439,479', 'result_1': 'toko', 'result_2': 'cyi' }, { 'position': '78,131,499,541', 'result_1': 'te', 'result_2': 'cyl' }, { 'position': '149,210,499,541', 'result_1': 'do', 'result_2': 'ccyyyl' }, { 'position': '231,284,499,541', 'result_1': 'dūū', 'result_2': 'ccyy' }, { 'position': '320,361,499,541', 'result_1': 'j', 'result_2': 'cyyi' }, { 'position': '391,451,499,541', 'result_1': 'kl', 'result_2': 'rrl' }, { 'position': '479,520,499,541', 'result_1': 't', 'result_2': 'ccyyi' }, { 'position': '556,614,499,541', 'result_1': 'tu', 'result_2': 'co' }, { 'position': '82,151,558,604', 'result_1': 'fodec', 'result_2': 'loocooo' }, { 'position': '161,252,558,604', 'result_1': 'tit', 'result_2': 'cooooolo' }, { 'position': '262,302,558,604', 'result_1': 't', 'result_2': 'ccy' }, { 'position': '312,400,558,604', 'result_1': 'blšobo', 'result_2': 'doooo' }, { 'position': '420,460,558,604', 'result_1': 'c', 'result_2': 'yyyl' }, { 'position': '472,529,558,604', 'result_1': 'c', 'result_2': 'cocoo' }, { 'position': '557,617,558,604', 'result_1': 'tcu', 'result_2': 'loco' }, { 'position': '80,148,617,659', 'result_1': 'ftū', 'result_2': 'cooooolo' }, { 'position': '164,219,617,659', 'result_1': 'tou', 'result_2': 'dooho' }, { 'position': '239,300,617,659', 'result_1': 'tc', 'result_2': 'pooo' }, { 'position': '320,351,617,659', 'result_1': 'j', 'result_2': 'yycyy' }, { 'position': '378,438,617,659', 'result_1': 'o', 'result_2': 'loooo' }, { 'position': '447,521,617,659', 'result_1': 't', 'result_2': 'coolo' }, { 'position': '529,582,617,659', 'result_1': 'cn', 'result_2': 'cyl' }, { 'position': '586,619,617,659', 'result_1': 'j', 'result_2': 'cyyy' }, { 'position': '77,155,675,711', 'result_1': 'bkcihū', 'result_2': 'dooco' }, { 'position': '163,243,675,711', 'result_1': 'mohl', 'result_2': 'coolo' }, { 'position': '266,314,675,711', 'result_1': 't', 'result_2': 'cy' }, { 'position': '330,384,675,711', 'result_1': 't', 'result_2': 'cl' }, { 'position': '406,449,675,711', 'result_1': 'c', 'result_2': 'cyyy' }]
        let data_3 = [{ 'position': '20,61,18,58', 'result_1': 'usei', 'result_2': 'osi' }, { 'position': '73,108,18,58', 'result_1': 'aan', 'result_2': 'yaon' }, { 'position': '125,163,18,58', 'result_1': 'siin', 'result_2': 'tiin' }, { 'position': '174,201,18,58', 'result_1': 'eho', 'result_2': 'f' }, { 'position': '212,249,18,58', 'result_1': 'kicen', 'result_2': 'n' }, { 'position': '262,312,18,58', 'result_1': 'gkaka', 'result_2': 'uitaan' }, { 'position': '317,352,18,58', 'result_1': 'bn', 'result_2': 'ka' }, { 'position': '362,417,18,58', 'result_1': 'ahtafūa', 'result_2': 'lun' }, { 'position': '439,480,18,58', 'result_1': 'aiman', 'result_2': 'fdn' }, { 'position': '490,547,18,58', 'result_1': 'inhaūn', 'result_2': 'inaa' }, { 'position': '547,643,18,58', 'result_1': 'takkasulai', 'result_2': 'akūrkoaoli' }, { 'position': '643,684,18,58', 'result_1': 'oro', 'result_2': 'krii' }, { 'position': '686,734,18,58', 'result_1': 'shin', 'result_2': 'esonin' }]
        let data_4 = [{'position': '55,93,16,63', 'result_1': 'doo', 'result_2': 'bob'}, {'position': '113,189,16,63', 'result_1': 'boigon', 'result_2': 'bih'}, {'position': '206,272,16,63', 'result_1': 'wnjifi', 'result_2': 'fjifi'}, {'position': '309,382,16,63', 'result_1': 'yadara', 'result_2': 'yadpara'}, {'position': '404,453,16,63', 'result_1': 'ten', 'result_2': 'te'}, {'position': '475,517,16,63', 'result_1': 'de', 'result_2': 'ce'}, {'position': '54,148,121,164', 'result_1': 'isinara', 'result_2': 'kisicara'}, {'position': '162,205,121,164', 'result_1': 'be', 'result_2': ''}, {'position': '227,309,121,164', 'result_1': 'jocimbi', 'result_2': 'kiocimi'}, {'position': '337,400,121,164', 'result_1': 'sembi', 'result_2': 'tsumbi'}, {'position': '63,85,218,272', 'result_1': 'fomi', 'result_2': 'do'}, {'position': '85,113,218,272', 'result_1': 'ji', 'result_2': 'du'}, {'position': '158,234,218,272', 'result_1': 'eiten', 'result_2': 'eitae'}, {'position': '247,304,218,272', 'result_1': 'jaka', 'result_2': 'a'}, {'position': '313,381,218,272', 'result_1': 'fūfi', 'result_2': 'tfi'}, {'position': '400,487,218,272', 'result_1': 'untuhun', 'result_2': 'untubu'}, {'position': '65,98,325,374', 'result_1': 'lll', 'result_2': 'h'}, {'position': '106,141,325,374', 'result_1': 'žf', 'result_2': 'yu'}, {'position': '159,221,325,374', 'result_1': 'oho', 'result_2': 'onho'}, {'position': '237,277,325,374', 'result_1': 'ba', 'result_2': 'b'}, {'position': '292,363,325,374', 'result_1': 'akū', 'result_2': 'okūū'}, {'position': '379,442,325,374', 'result_1': 'sembi', 'result_2': 'tsupbi'}, {'position': '60,164,422,480', 'result_1': 'ieocombru', 'result_2': 'cppš'}, {'position': '180,256,422,480', 'result_1': 'banjire', 'result_2': 'banjid'}, {'position': '279,330,422,480', 'result_1': 'were', 'result_2': 'dey'}, {'position': '350,388,422,480', 'result_1': 'de', 'result_2': 'd'}, {'position': '404,498,422,480', 'result_1': 'baitalara', 'result_2': 'baitelara'}, {'position': '58,167,481,524', 'result_1': 'ekiyehun', 'result_2': 'ekiyahn'}, {'position': '60,96,532,581', 'result_1': 'cu', 'result_2': 'cu'}, {'position': '181,279,532,581', 'result_1': 'teserkū', 'result_2': 'cesurkū'}, {'position': '289,327,532,581', 'result_1': 'be', 'result_2': 'be'}, {'position': '341,431,532,581', 'result_1': 'ekiyehun', 'result_2': 'ekiyab'}, {'position': '443,507,532,581', 'result_1': 'sembi', 'result_2': 'sudbi'}];
        let data_5 = [{'position': '24,69,16,56', 'result_1': 'aima ', 'result_2': 'eius'}, {'position': '73,114,16,56', 'result_1': 'crū', 'result_2': 'si'}, {'position': '115,175,16,56', 'result_1': 'geyamahi', 'result_2': 'sgrami'}, {'position': '185,216,16,56', 'result_1': 'jan', 'result_2': 'f'}, {'position': '222,279,16,56', 'result_1': 'wanggtn', 'result_2': 'waln'}, {'position': '282,322,16,56', 'result_1': 'almin', 'result_2': 'upmn'}, {'position': '326,374,16,56', 'result_1': 'jakūu', 'result_2': 'okomi'}, {'position': '379,424,16,56', 'result_1': 'ce', 'result_2': 'ec'}, {'position': '438,482,16,56', 'result_1': 'suwan', 'result_2': 'suwn'}, {'position': '487,536,16,56', 'result_1': 'danggo', 'result_2': 'unoo'}, {'position': '559,609,16,56', 'result_1': 'yarhū', 'result_2': 'yaradiu'}, {'position': '631,688,16,56', 'result_1': 'nyeri', 'result_2': 'fdari'}, {'position': '709,767,16,56', 'result_1': 'animan', 'result_2': 'oiuun'}, {'position': '811,850,16,56', 'result_1': 'eji', 'result_2': 'mji'}, {'position': '26,67,102,140', 'result_1': 'nilan', 'result_2': 'fiun'}, {'position': '84,135,102,140', 'result_1': 'tūrha', 'result_2': 'ūio'}, {'position': '163,209,102,140', 'result_1': 'wara', 'result_2': 'tartn'}, {'position': '231,257,102,140', 'result_1': 'fl', 'result_2': 'jfi'}, {'position': '273,328,102,140', 'result_1': 'shala', 'result_2': 'sooln'}, {'position': '345,380,102,140', 'result_1': 'jlri', 'result_2': 'jermi'}, {'position': '386,412,102,140', 'result_1': 'b', 'result_2': 'bk'}, {'position': '425,468,102,140', 'result_1': 'ursl', 'result_2': 'i'}, {'position': '470,501,102,140', 'result_1': 'jimu', 'result_2': 'moi'}, {'position': '612,669,102,140', 'result_1': 'taizu', 'result_2': 'eiidi'}, {'position': '688,735,102,140', 'result_1': 'dergi', 'result_2': 'dcuii'}, {'position': '763,824,102,140', 'result_1': 'taiangi', 'result_2': 'lnmi'}, {'position': '24,67,195,237', 'result_1': 'taime', 'result_2': 'boiim'}, {'position': '77,113,195,237', 'result_1': 'jha', 'result_2': 'kiip'}, {'position': '131,237,195,237', 'result_1': 'inggodgn', 'result_2': 'oangkogeuromdpo'}, {'position': '238,296,195,237', 'result_1': 'anggali', 'result_2': 'loli'}, {'position': '310,352,195,237', 'result_1': 'u', 'result_2': 'ki'}, {'position': '359,435,195,237', 'result_1': 'dowalhaya', 'result_2': 'ollara'}, {'position': '439,478,195,237', 'result_1': 'hche', 'result_2': 'di'}, {'position': '488,532,195,237', 'result_1': 'niman', 'result_2': 'fūimu'}, {'position': '545,585,195,237', 'result_1': 'jecen', 'result_2': 'lo'}, {'position': '615,662,195,237', 'result_1': 'aiman', 'result_2': 'kpun'}, {'position': '693,753,195,237', 'result_1': 'taomoho', 'result_2': 'tomuoo'}, {'position': '18,60,283,324', 'result_1': 'tare', 'result_2': 'brd'}, {'position': '76,128,283,324', 'result_1': 'jayaan', 'result_2': 'rkūnjan'}, {'position': '143,199,283,324', 'result_1': 'duhgūja', 'result_2': 'tupaca'}, {'position': '208,256,283,324', 'result_1': 'olhon', 'result_2': 'toloa'}, {'position': '269,310,283,324', 'result_1': 'dung', 'result_2': 'duei'}, {'position': '328,373,283,324', 'result_1': 'julšefi', 'result_2': 'ppai'}, {'position': '388,426,283,324', 'result_1': 'meyel', 'result_2': 'dua'}, {'position': '442,496,283,324', 'result_1': 'fofeho', 'result_2': 'fopui'}, {'position': '518,553,283,324', 'result_1': 'sū', 'result_2': 'tipu'}, {'position': '568,643,283,324', 'result_1': 'ancelakū', 'result_2': 'enculkū'}, {'position': '662,700,283,324', 'result_1': 'haae', 'result_2': 'coonpa'}, {'position': '723,758,283,324', 'result_1': 'jank', 'result_2': 'ak'}, {'position': '22,64,374,418', 'result_1': 'hsihu', 'result_2': 'pi'}, {'position': '74,126,374,418', 'result_1': 'omohū', 'result_2': 'omoi'}, {'position': '132,169,374,418', 'result_1': 'to', 'result_2': 'sūūi'}, {'position': '185,227,374,418', 'result_1': 'oenehu', 'result_2': 'fudp'}, {'position': '227,277,374,418', 'result_1': 'hafn', 'result_2': 'crii'}, {'position': '292,330,374,418', 'result_1': 'hoe', 'result_2': 'je'}, {'position': '343,401,374,418', 'result_1': 'namiulo', 'result_2': 'famoli'}, {'position': '418,473,374,418', 'result_1': 'duirun', 'result_2': 'suiu'}, {'position': '474,536,374,418', 'result_1': 'nigguta', 'result_2': 'fauo'}, {'position': '547,594,374,418', 'result_1': 'nimaca', 'result_2': 'imeca'}, {'position': '606,672,374,418', 'result_1': 'delrgecen', 'result_2': 'oouca'}, {'position': '681,729,374,418', 'result_1': 'muren', 'result_2': 'muunk'}, {'position': '733,789,374,418', 'result_1': 'jakūta', 'result_2': 'jan'}, {'position': '23,70,468,513', 'result_1': 'usui', 'result_2': 'osui'}, {'position': '84,126,468,513', 'result_1': 'aran', 'result_2': 'yaon'}, {'position': '145,195,468,513', 'result_1': 'siin', 'result_2': 'siin'}, {'position': '202,232,468,513', 'result_1': 'teho', 'result_2': 'f'}, {'position': '244,287,468,513', 'result_1': 'kiuren', 'result_2': 'boun'}, {'position': '303,361,468,513', 'result_1': 'gūkaka', 'result_2': 'uittn'}, {'position': '366,407,468,513', 'result_1': 'ien', 'result_2': 'kamn'}, {'position': '419,482,468,513', 'result_1': 'ahafan', 'result_2': 'sdlran'}, {'position': '507,555,468,513', 'result_1': 'aiman', 'result_2': 'fidun'}, {'position': '567,632,468,513', 'result_1': 'jintahaūn', 'result_2': 'ina'}, {'position': '633,744,468,513', 'result_1': 'takūansulo', 'result_2': 'takūrakramoli'}, {'position': '744,791,468,513', 'result_1': 'oro', 'result_2': 'keri'}];
        let data_6 = [{'position': '22,82,21,64', 'result_1': 'ffusheku', 'result_2': 'doybo'}, {'position': '121,164,21,64', 'result_1': 'haru', 'result_2': 'hui'}, {'position': '205,265,21,64', 'result_1': 'debede', 'result_2': 'dubed'}, {'position': '278,337,21,64', 'result_1': 'haldaha', 'result_2': 'cldc'}, {'position': '351,402,21,64', 'result_1': 'selei', 'result_2': 'sulli'}, {'position': '418,463,21,64', 'result_1': 'jergi', 'result_2': 'urmi'}, {'position': '26,80,112,151', 'result_1': 'ajige', 'result_2': 'ajigi'}, {'position': '96,165,112,151', 'result_1': 'heldahan', 'result_2': 'sldnhn'}, {'position': '183,213,112,151', 'result_1': 'bni', 'result_2': 'ba'}, {'position': '242,308,112,151', 'result_1': 'fusheku', 'result_2': 'duskuo'}, {'position': '357,407,112,151', 'result_1': 'temun', 'result_2': 'tun'}, {'position': '418,467,112,151', 'result_1': 'sembi', 'result_2': 'subbi'}, {'position': '23,97,204,249', 'result_1': 'tuhebume', 'result_2': 'tumebuml'}, {'position': '110,207,204,249', 'result_1': 'hūwaitaha', 'result_2': 'pwaitay'}, {'position': '224,244,204,249', 'result_1': 'j', 'result_2': 'do'}, {'position': '267,311,204,249', 'result_1': 'wehe', 'result_2': 'dubi'}, {'position': '327,371,204,249', 'result_1': 'hiyan', 'result_2': 'hiyan'}, {'position': '381,430,204,249', 'result_1': 'jarin', 'result_2': 'iuri'}, {'position': '18,62,298,339', 'result_1': 'jeri', 'result_2': 'deuri'}, {'position': '78,157,298,339', 'result_1': 'durungga', 'result_2': 'durunguha'}, {'position': '170,207,298,339', 'result_1': 'jaka', 'result_2': 'yok'}, {'position': '218,249,298,339', 'result_1': 'bi', 'result_2': 'ba'}, {'position': '250,304,298,339', 'result_1': 'ffushaku', 'result_2': 'dubo'}, {'position': '320,389,298,339', 'result_1': 'tuhebuku', 'result_2': 'tuebuku'}, {'position': '390,438,298,339', 'result_1': 'sembi', 'result_2': 'dsbi'}, {'position': '20,68,388,430', 'result_1': 'adeame', 'result_2': 'om'}, {'position': '76,135,388,430', 'result_1': 'ulifi', 'result_2': 'lifi'}, {'position': '148,180,388,430', 'result_1': 'mooo', 'result_2': 'djoo'}, {'position': '215,267,388,430', 'result_1': 'fesin', 'result_2': 'd'}, {'position': '276,303,388,430', 'result_1': 'de', 'result_2': 'de'}, {'position': '319,377,388,430', 'result_1': 'kamcime', 'result_2': 'komdil'}, {'position': '392,456,388,430', 'result_1': 'haldafi', 'result_2': 'klfi'}, {'position': '24,91,478,522', 'result_1': 'fushere', 'result_2': 'dusar'}, {'position': '120,159,478,522', 'result_1': 'ial', 'result_2': 'yon'}, {'position': '186,288,478,522', 'result_1': 'fusherengge', 'result_2': 'duserengi'}, {'position': '317,346,478,522', 'result_1': 'bn', 'result_2': 'b'}, {'position': '373,446,478,522', 'result_1': 'debsiku', 'result_2': 'dbaib'}];
        let data_7 = [{'position': '7,81,6,64', 'result_1': 'j', 'result_2': 'cocco'}, {'position': '107,219,6,64', 'result_1': 't', 'result_2': 'cooooo'}, {'position': '240,266,6,64', 'result_1': 'j', 'result_2': 'kcyy'}, {'position': '308,402,6,64', 'result_1': 'j', 'result_2': 'cooco'}, {'position': '429,514,6,64', 'result_1': 'j', 'result_2': 'cooco'}, {'position': '544,623,6,64', 'result_1': 'j', 'result_2': 'cococoo'}, {'position': '648,777,6,64', 'result_1': 'd', 'result_2': 'cooooo'}, {'position': '11,126,139,203', 'result_1': 'j', 'result_2': 'pooo'}, {'position': '174,355,139,203', 'result_1': 'tlooo', 'result_2': 'ooooo'}, {'position': '375,513,139,203', 'result_1': 'joo', 'result_2': 'po'}, {'position': '551,643,139,203', 'result_1': 't', 'result_2': 'pooo'}, {'position': '667,771,139,203', 'result_1': 'j', 'result_2': 'coooo'}, {'position': '2,116,272,333', 'result_1': 'ttt', 'result_2': 'coocoo'}, {'position': '144,176,272,333', 'result_1': 'j', 'result_2': 'ycyy'}, {'position': '210,343,272,333', 'result_1': 't', 'result_2': 'cooo'}, {'position': '387,487,272,333', 'result_1': 'jct', 'result_2': 'poco'}, {'position': '487,515,272,333', 'result_1': 'j', 'result_2': 'ycy'}, {'position': '566,599,272,333', 'result_1': 'j', 'result_2': 'yycy'}, {'position': '618,685,272,333', 'result_1': 'j', 'result_2': 'poooo'}, {'position': '712,782,272,333', 'result_1': 'j', 'result_2': 'ccy'}];
        let data_8 = [{'position': '38,109,57,122', 'result_1': 'f', 'result_2': 'cococo'}, {'position': '126,262,57,122', 'result_1': 'j', 'result_2': 'coooo'}, {'position': '327,422,57,122', 'result_1': 't', 'result_2': 'pooco'}, {'position': '436,492,57,122', 'result_1': 'f', 'result_2': 'dooo'}, {'position': '37,139,199,252', 'result_1': 'j', 'result_2': 'cocco'}, {'position': '155,249,199,252', 'result_1': 'c', 'result_2': 'cococo'}, {'position': '265,312,199,252', 'result_1': 'j', 'result_2': 'ccy'}, {'position': '312,349,199,252', 'result_1': 'j', 'result_2': 'ycyy'}, {'position': '369,493,199,252', 'result_1': 't', 'result_2': 'ooooo'}, {'position': '43,100,326,375', 'result_1': 'j', 'result_2': 'cooco'}, {'position': '101,129,326,375', 'result_1': 'j', 'result_2': 'ye\n'}, {'position': '159,242,326,375', 'result_1': 'j', 'result_2': 'pococo'}, {'position': '275,356,326,375', 'result_1': 'f', 'result_2': 'coocoo'}, {'position': '377,502,326,375', 'result_1': 't', 'result_2': 'ooopo'}];
        let data_9 = [{'position': '24,120,15,77', 'result_1': 'bisirengge', 'result_2': 'bikouanggen'}, {'position': '146,188,15,77', 'result_1': 'be', 'result_2': 'buin'}, {'position': '210,263,15,77', 'result_1': 'jumu', 'result_2': 'du'}, {'position': '263,290,15,77', 'result_1': 'cu', 'result_2': 'mdlu'}, {'position': '291,315,15,77', 'result_1': 'jū', 'result_2': 'cyi'}, {'position': '337,395,15,77', 'result_1': 'julesei', 'result_2': 'juluoi'}, {'position': '411,478,15,77', 'result_1': 'genggume', 'result_2': 'guylul'}, {'position': '489,555,15,77', 'result_1': 'banjiha', 'result_2': 'bcid'}, {'position': '565,622,15,77', 'result_1': 'haadan', 'result_2': 'ouda'}, {'position': '631,668,15,77', 'result_1': 'be', 'result_2': 'bi'}, {'position': '218,318,80,115', 'result_1': 'enggeleku', 'result_2': 'enggululhu'}, {'position': '22,103,121,170', 'result_1': 'gūlakū', 'result_2': 'ūlakū'}, {'position': '111,160,121,170', 'result_1': 'sembi', 'result_2': 'subi'}, {'position': '197,244,121,170', 'result_1': 'frmeu', 'result_2': 'dde'}, {'position': '246,297,121,170', 'result_1': 'he', 'result_2': 'c'}, {'position': '331,403,121,170', 'result_1': 'enggeleku', 'result_2': 'nulu'}, {'position': '425,473,121,170', 'result_1': 'sembi', 'result_2': 'suubi'}, {'position': '20,73,225,278', 'result_1': 'lun', 'result_2': 'teia'}, {'position': '95,127,225,278', 'result_1': 'be', 'result_2': 'b'}, {'position': '153,176,225,278', 'result_1': 'j', 'result_2': 'deu'}, {'position': '176,222,225,278', 'result_1': 'bbi', 'result_2': 'dp'}, {'position': '222,247,225,278', 'result_1': 'cu', 'result_2': 'du'}, {'position': '249,298,225,278', 'result_1': 'fuicu', 'result_2': 'duceu'}, {'position': '333,383,225,278', 'result_1': 'nllin', 'result_2': 'fia'}, {'position': '392,431,225,278', 'result_1': 'de', 'result_2': 'de'}, {'position': '438,494,225,278', 'result_1': 'orho', 'result_2': 'toroo'}, {'position': '508,539,225,278', 'result_1': 'coo', 'result_2': ''}, {'position': '554,605,225,278', 'result_1': 'akū', 'result_2': 'oor'}, {'position': '165,309,279,315', 'result_1': 'hūwantahūn', 'result_2': 'hwantakhūn'}, {'position': '18,126,325,380', 'result_1': 'hoūwantašambi', 'result_2': 'dlwaentmi'}, {'position': '146,178,325,380', 'result_1': 'c', 'result_2': 'dc'}, {'position': '182,321,325,380', 'result_1': 'domocbohohha', 'result_2': 'pecceke'}, {'position': '328,373,325,380', 'result_1': 'oho', 'result_2': 'ooo'}, {'position': '394,431,325,380', 'result_1': 'be', 'result_2': 'biu\n'}, {'position': '440,601,325,380', 'result_1': 'tafanrhūšambi', 'result_2': 'dawantakhūšembi'}, {'position': '144,166,428,466', 'result_1': 'j', 'result_2': 'du'}, {'position': '186,212,428,466', 'result_1': '', 'result_2': 'ju'}, {'position': '238,259,428,466', 'result_1': 'j', 'result_2': 'dd'}, {'position': '262,298,428,466', 'result_1': '', 'result_2': 'dpo'}, {'position': '319,380,428,466', 'result_1': 'secci', 'result_2': 'sujci'}, {'position': '140,165,446,481', 'result_1': 'y', 'result_2': 'cu'}, {'position': '190,212,446,481', 'result_1': '', 'result_2': 'y'}, {'position': '257,301,446,481', 'result_1': 'c', 'result_2': 'du'}, {'position': '140,170,485,524', 'result_1': 'ni', 'result_2': 't'}, {'position': '237,306,485,524', 'result_1': 'haacin', 'result_2': 'yucin'}, {'position': '136,172,532,576', 'result_1': 'e', 'result_2': 'du'}, {'position': '184,226,532,576', 'result_1': 'cu', 'result_2': 'dele'}, {'position': '236,276,532,576', 'result_1': 'luu', 'result_2': 'dyu'}, {'position': '317,353,532,576', 'result_1': 'g', 'result_2': 'heu'}, {'position': '352,373,532,576', 'result_1': 't', 'result_2': 'y'}, {'position': '140,170,592,627', 'result_1': 'šoi', 'result_2': 'dbi'}, {'position': '191,228,592,627', 'result_1': 'ioi', 'result_2': 'kioi'}, {'position': '241,273,592,627', 'result_1': 'lui', 'result_2': 'llui'}];
        let data_10 = [{'position': '31,82,18,70', 'result_1': 'uolco', 'result_2': 'clu'}, {'position': '83,175,18,70', 'result_1': 'dlceol', 'result_2': 'lccedede'}, {'position': '201,243,18,70', 'result_1': 'yaya', 'result_2': 'yoya'}, {'position': '256,290,18,70', 'result_1': 'a', 'result_2': 'bik'}, {'position': '329,393,18,70', 'result_1': 'dalbai', 'result_2': 'dulbai'}, {'position': '410,457,18,70', 'result_1': 'ergi', 'result_2': 'eri'}, {'position': '476,509,18,70', 'result_1': 'be', 'result_2': 'bei'}, {'position': '44,181,74,119', 'result_1': 'dalbashūn', 'result_2': 'melbaskapn'}, {'position': '40,90,121,175', 'result_1': 'hi', 'result_2': 'de'}, {'position': '94,172,121,175', 'result_1': 'obluleal', 'result_2': 'cld'}, {'position': '201,304,121,175', 'result_1': 'dalbasahūn', 'result_2': 'mhlbasann'}, {'position': '324,381,121,175', 'result_1': 'sembi', 'result_2': 'suubi'}, {'position': '45,89,184,221', 'result_1': 'ang', 'result_2': 'poi'}, {'position': '102,147,184,221', 'result_1': 'iyan', 'result_2': 'biyan'}, {'position': '154,208,184,221', 'result_1': 'siyei', 'result_2': 'hsidai'}, {'position': '43,100,220,279', 'result_1': 'eiu', 'result_2': 'dedu'}, {'position': '144,198,220,279', 'result_1': 'jebele', 'result_2': 'jeblo'}, {'position': '215,258,220,279', 'result_1': 'ergi', 'result_2': 'rgi'}, {'position': '275,311,220,279', 'result_1': 'be', 'result_2': 'bi'}, {'position': '350,377,220,279', 'result_1': 'ju', 'result_2': 'du'}, {'position': '379,406,220,279', 'result_1': 'c', 'result_2': 'du'}, {'position': '406,433,220,279', 'result_1': 'fu', 'result_2': 'di'}, {'position': '470,533,220,279', 'result_1': 'julergi', 'result_2': 'duflrgi'}, {'position': '42,111,277,326', 'result_1': 'ici', 'result_2': 'ici'}, {'position': '352,434,277,326', 'result_1': 'jiuleri', 'result_2': 'juleri'}, {'position': '34,79,325,377', 'result_1': 'lo', 'result_2': 'ti'}, {'position': '145,186,325,377', 'result_1': 'ici', 'result_2': 'ici'}, {'position': '208,253,325,377', 'result_1': 'ergi', 'result_2': 'erei'}, {'position': '273,322,325,377', 'result_1': 'sembi', 'result_2': 'subi'}, {'position': '346,397,325,377', 'result_1': "c'", 'result_2': 'kdu'}, {'position': '470,528,325,377', 'result_1': 'jiulari', 'result_2': 'juluri'}, {'position': '46,74,385,418', 'result_1': 'jl', 'result_2': 'lib'}, {'position': '351,403,385,418', 'result_1': 'ciyan', 'result_2': 'ciyan'}, {'position': '40,83,428,484', 'result_1': 'seme', 'result_2': 'juu'}, {'position': '161,187,428,484', 'result_1': 'fi', 'result_2': 'cu'}, {'position': '187,211,428,484', 'result_1': 'fi', 'result_2': 'd'}, {'position': '212,235,428,484', 'result_1': 'f', 'result_2': 'dli'}, {'position': '287,316,428,484', 'result_1': 'na', 'result_2': 'd'}, {'position': '334,406,428,484', 'result_1': 'bisire', 'result_2': 'bisid'}, {'position': '419,456,428,484', 'result_1': 'ba', 'result_2': 'bi'}, {'position': '469,505,428,484', 'result_1': 'ci', 'result_2': 'cji'}, {'position': '41,127,524,576', 'result_1': 'gisurembi', 'result_2': 'gisudmbi'}, {'position': '146,189,524,576', 'result_1': 'du', 'result_2': ''}, {'position': '194,243,524,576', 'result_1': "c'uu", 'result_2': 'jdu'}, {'position': '285,345,524,576', 'result_1': 'ibere', 'result_2': 'ibed'}, {'position': '355,390,524,576', 'result_1': 'be', 'result_2': 'bi'}, {'position': '398,461,524,576', 'result_1': 'julehi', 'result_2': 'dulaki'}, {'position': '464,515,524,576', 'result_1': 'sembi', 'result_2': 'dubi'}];
        let data_11 = [{'position': '31,131,19,72', 'result_1': 'uulahangge', 'result_2': 'oblknangme'}, {'position': '159,191,19,72', 'result_1': 'be', 'result_2': 'be'}, {'position': '234,259,19,72', 'result_1': 'j', 'result_2': 'di'}, {'position': '258,279,19,72', 'result_1': 'j', 'result_2': 'y'}, {'position': '287,315,19,72', 'result_1': 'ju', 'result_2': 'cu'}, {'position': '348,415,19,72', 'result_1': 'tatšai', 'result_2': 'dnyoši'}, {'position': '470,562,19,72', 'result_1': 'siramengge', 'result_2': 'siramangge'}, {'position': '229,312,67,106', 'result_1': 'maifu', 'result_2': 'taiubu'}, {'position': '31,95,120,169', 'result_1': 'taši', 'result_2': 'boši'}, {'position': '116,170,120,169', 'result_1': 'sembi', 'result_2': 'cbi'}, {'position': '214,259,120,169', 'result_1': 'ce', 'result_2': 'de'}, {'position': '265,316,120,169', 'result_1': 'lm', 'result_2': 'c'}, {'position': '354,418,120,169', 'result_1': 'tajgfu', 'result_2': 'boyoubi'}, {'position': '451,501,120,169', 'result_1': 'sei', 'result_2': 'supbi'}, {'position': '32,76,215,272', 'result_1': 'dooo', 'result_2': 'do'}, {'position': '82,110,215,272', 'result_1': 'u', 'result_2': 'mlu'}, {'position': '161,231,215,272', 'result_1': 'taoboo', 'result_2': 'oiboo'}, {'position': '293,381,215,272', 'result_1': 'saramengge', 'result_2': 'srraplagbie'}, {'position': '397,429,215,272', 'result_1': 'b', 'result_2': 'be'}, {'position': '459,501,215,272', 'result_1': 'u', 'result_2': 'd'}, {'position': '504,528,215,272', 'result_1': 'du', 'result_2': 'cu'}, {'position': '28,128,270,319', 'result_1': 'šooši', 'result_2': 'sooši'}, {'position': '456,548,270,319', 'result_1': 'soofu', 'result_2': 'sooo'}, {'position': '31,76,319,376', 'result_1': 'i', 'result_2': 'ui'}, {'position': '79,127,319,376', 'result_1': '', 'result_2': 'di'}, {'position': '165,227,319,376', 'result_1': 'šooši', 'result_2': 'sooši'}, {'position': '265,315,319,376', 'result_1': 'sembi', 'result_2': 'sumbi'}, {'position': '449,541,319,376', 'result_1': 'cuebll', 'result_2': 'diu'}, {'position': '36,71,379,415', 'result_1': 'šao', 'result_2': 'abia'}, {'position': '84,116,379,415', 'result_1': 'žaai', 'result_2': 'ke'}, {'position': '461,502,379,415', 'result_1': 'tao', 'result_2': 'oo'}, {'position': '517,539,379,415', 'result_1': 'jū', 'result_2': 'u'}, {'position': '29,83,421,477', 'result_1': 'šou', 'result_2': 'oopo'}, {'position': '132,216,421,477', 'result_1': 'siramengge', 'result_2': 'siramajme'}, {'position': '231,266,421,477', 'result_1': 'be', 'result_2': 'd'}, {'position': '285,326,421,477', 'result_1': 'dru', 'result_2': 'dh'}, {'position': '330,358,421,477', 'result_1': 't', 'result_2': 'cy'}, {'position': '384,422,421,477', 'result_1': 'juolli', 'result_2': 'yeu'}, {'position': '428,454,421,477', 'result_1': 'du', 'result_2': 'yi'}, {'position': '506,572,421,477', 'result_1': 'šoboo', 'result_2': 'soobooi'}, {'position': '281,377,475,523', 'result_1': 'taizi', 'result_2': 'tayidZi'}, {'position': '382,482,475,523', 'result_1': 'taiši', 'result_2': 'tayušk'}, {'position': '29,92,526,581', 'result_1': 'šooboo', 'result_2': 'sooboo'}, {'position': '124,175,526,581', 'result_1': 'sembi', 'result_2': 'sumi'}, {'position': '275,321,526,581', 'result_1': 'ca', 'result_2': 'cee'}, {'position': '333,377,526,581', 'result_1': 'žžohi', 'result_2': 'fe'}, {'position': '382,427,526,581', 'result_1': 'cžu', 'result_2': 'k'}, {'position': '436,485,526,581', 'result_1': 'tm', 'result_2': 'deti'}, {'position': '513,569,526,581', 'result_1': 'tazi', 'result_2': 'badZi'}, {'position': '284,324,587,622', 'result_1': 'tai', 'result_2': 'i'}, {'position': '339,368,587,622', 'result_1': 'zi', 'result_2': 'ci\ni'}, {'position': '379,419,587,622', 'result_1': 'tai', 'result_2': 'tak'}, {'position': '429,463,587,622', 'result_1': 'šai', 'result_2': 'j'}];
        this.data = data_1
        if (filename === 'image2.jpg') {
            this.data = data_2
        } else if (filename === 'image3.png') {
            this.data = data_3
        } else if (filename === 'image4.png') {
            this.data = data_4
        } else if (filename === 'image5.png') {
            this.data = data_5
        } else if (filename === 'image6.png') {
            this.data = data_6
        } else if (filename === 'image7.png') {
            this.data = data_7
        } else if (filename === 'image8.png') {
            this.data = data_8
        } else if (filename === 'image9.png') {
            this.data = data_9
        } else if (filename === 'image10.png') {
            this.data = data_10
        } else if (filename === 'image11.png') {
            this.data = data_11
        }
        this.handleWithImage(this.file)
    },
    methods: {
        handleWithImage(file) {
            const that = this;
            var imageType = /^image\//;
            if (!imageType.test(file.type)) {
                return;
            }
            this.handleImage(file).then(res => {
                var reader = new FileReader();
                reader.onload = (function (e) {
                    that.imgSource = e.target.result;
                });
                reader.readAsDataURL(res);
            })
        },

        handleImage(file) {
            let that = this
            var read = new FileReader();
            read.readAsDataURL(file);
            return new Promise(function (resolve, reject) {
                read.onload = function (e) {
                    var ima = new Image();
                    ima.src = read.result;
                    ima.onload = function () {
                        var cas = document.getElementById("canvas");
                        that.width = this.width;
                        that.height = this.height;
                        cas.width = this.width * 0.6;
                        cas.height = this.height * 0.6;
                        if (this.width < 100) {
                            cas.width = this.width * 15;
                            cas.height = this.height * 0.5;
                        } else if (this.width < 300) {
                            cas.width = this.width * 1.5;
                            cas.height = this.height * 1.5;
                        } else if (this.width < 800) {
                            cas.width = this.width * 1.1;
                            cas.height = this.height * 0.8;
                        }
                        cas.style.border = "1px solid #000";
                        //that.handleWithData();
                        //that.handleWithData2();
                        //that.handleWithData3();
                        that.handleWithData4();

                        var canvas = document.createElement("canvas");
                        var ctx = canvas.getContext("2d");
                        var base64;

                        canvas.setAttribute("width", this.width * that.imgRatio);
                        canvas.setAttribute("height", this.height * that.imgRatio);
                        ctx.drawImage(this, 0, 0, this.width * that.imgRatio, this.height * that.imgRatio);

                        that.data.forEach((item,index) => {
                            let pos = item.position.split(',');
                            let x = pos[2] * that.imgRatio, y = pos[0] * that.imgRatio;
                            let w = pos[3] * that.imgRatio - pos[2] * that.imgRatio, h = pos[1] * that.imgRatio - pos[0] * that.imgRatio;
                            ctx.beginPath();
                            ctx.strokeStyle = "#FF0000";
                            ctx.strokeRect(x, y, w, h);
                            ctx.closePath();

                            ctx.beginPath();
                            ctx.fillStyle = "#00cc33"
                            ctx.fillText(index + 1, x, y);
                            ctx.closePath();
                        });

                        base64 = canvas.toDataURL(file["type"], 1);
                        var fileRes = that.dataURLToFile(base64, file.filename);
                        resolve(fileRes);
                    }
                }
            })
        },

        dataURLToFile(dataurl, filename) {
            var arr = dataurl.split(","),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, { type: mime });
        },

        // 原始排列顺序展示
        handleWithData() {
            const that = this;
            var canvas = document.getElementById("canvas");
            if (canvas.getContext) {
                var van = canvas.getContext("2d");
                van.font = '14px serif';
                this.data.forEach(item => {
                    van.beginPath();
                    let pos = item.position.split(',');
                    van.fillText(item.result_1, pos[2] * that.resultRatio, pos[0] * that.resultRatio);
                    van.closePath();
                });
            }
        },

        // 行列互换展示
        handleWithData2() {
            const that = this;
            let pos = that.data[0].position.split(',');
            let y_init = pos[0];
            let x_init = pos[2];
            let first_cell = []
            that.data.forEach(item => {
                let pos_temp = item.position.split(',');
                if (pos_temp[0] - y_init < 30 && pos_temp[0] - y_init > -30) {
                    first_cell.push(item);
                }
            })
            console.log(first_cell);

            var canvas = document.getElementById("canvas");
            if (canvas.getContext) {
                var van = canvas.getContext("2d");
                van.font = '14px serif';
                let count_out = 0;
                first_cell.forEach(item => {
                    let x = item.position.split(',')[2];
                    let count_in = 0;
                    that.data.forEach(e => {
                        let pos_e = e.position.split(',');
                        if (pos_e[2] === x) {
                            van.beginPath();
                            if (that.width < 100) {
                                van.fillText(e.result_1, (Number(x_init) + 100 * count_in) * that.resultRatio, (Number(y_init) + 60 * count_out) * that.resultRatio);
                            } else if (that.width < 300) {
                                van.fillText(e.result_1, (Number(x_init) + 80 * count_in) * that.resultRatio, (Number(y_init) + 60 * count_out) * that.resultRatio);
                            } else if (that.width < 800) {
                                van.fillText(e.result_1, (Number(x_init) + 100 * count_in) * that.resultRatio, (Number(y_init) + 60 * count_out) * that.resultRatio);
                            } else {
                                van.fillText(e.result_1, (Number(x_init) + 180 * count_in) * that.resultRatio, (Number(y_init) + 60 * count_out) * that.resultRatio);
                            }
                            van.closePath();
                            count_in++;
                        }
                    })
                    count_out++;
                })
            }
        },

        // 行列互换展示
        handleWithData3() {
            const that = this;
            let pos = that.data[0].position.split(',');
            let y_init = pos[0];
            let x_init = pos[2];

            // 获取每一行的开头
            let max_x = Number(x_init);
            let first_cell = [];
            first_cell.push(that.data[0]);
            for (let i = 0; i < that.data.length; i++) {
                let pos_temp = that.data[i].position.split(',');
                if (Number(pos_temp[2]) > max_x) {
                    first_cell.push(that.data[i]);
                    max_x = pos_temp[2];
                }
            }
            console.log(first_cell);

            var canvas = document.getElementById("canvas");
            if (canvas.getContext) {
                var van = canvas.getContext("2d");
                van.font = '14px serif';
                let count_out = 0;
                first_cell.forEach(item => {
                    let x = item.position.split(',')[2];
                    let count_in = 0;
                    that.data.forEach(e => {
                        let pos_e = e.position.split(',');
                        if (pos_e[2] === x) {
                            van.beginPath();
                            if (that.width < 100) {
                                van.fillText(e.result_1, (Number(x_init) + 100 * count_in) * that.resultRatio, (Number(y_init) + 60 * count_out) * that.resultRatio);
                            } else if (that.width < 300) {
                                van.fillText(e.result_1, (Number(x_init) + 80 * count_in) * that.resultRatio, (Number(y_init) + 60 * count_out) * that.resultRatio);
                            } else if (that.width < 800) {
                                van.fillText(e.result_1, (Number(x_init) + 100 * count_in) * that.resultRatio, (Number(y_init) + 60 * count_out) * that.resultRatio);
                            } else {
                                van.fillText(e.result_1, (Number(x_init) + 180 * count_in) * that.resultRatio, (Number(y_init) + 60 * count_out) * that.resultRatio);
                            }
                            van.closePath();
                            count_in++;
                        }
                    })
                    count_out++;
                })
            }
        },

        // 行列互换展示
        handleWithData4() {
            const that = this;
            let pos = that.data[0].position.split(',');
            let y_init = pos[0];
            let x_init = pos[2];
            //由于分割数据顺序是按列排列的，因此存每一列索引值的起始值和结束值
            let data_idx = [];
            let start_idx = 0;
            let max_x = x_init;
            console.log(that.data);
            for (let i = 0; i < that.data.length; i++) {
                let pos_temp = that.data[i].position.split(',');
                if (Number(pos_temp[2]) > max_x) {
                    data_idx.push(start_idx + ',' + i);
                    max_x = pos_temp[2];
                    start_idx = i;
                }
            }
            data_idx.push(start_idx + ',' + that.data.length);
            console.log(data_idx);

            var canvas = document.getElementById("canvas");
            if (canvas.getContext) {
                var van = canvas.getContext("2d");
                let count_out = 0;
                for (let i = 0; i < data_idx.length; i++) {
                    let idx = data_idx[i].split(',');
                    let start_idx_row = Number(idx[0]);
                    let end_idx_row = Number(idx[1]);
                    let count_in = 0;
                    for (let j = start_idx_row; j < end_idx_row; j++) {
                        van.beginPath();
                        van.font = '14px serif';
                        van.fillStyle = "#000000";
                        if (that.width < 100) {
                            van.fillText(that.data[j].result_1, (Number(x_init) + 110 * count_in) * that.resultRatio, (Number(y_init) + 60 * count_out) * that.resultRatio);
                        } else if (that.width < 300) {
                            van.fillText(that.data[j].result_1, (Number(x_init) + 80 * count_in) * that.resultRatio, (Number(y_init) + 60 * count_out) * that.resultRatio);
                        } else if (that.width < 800) {
                            van.fillText(that.data[j].result_1, (Number(x_init) + 120 * count_in) * that.resultRatio, (Number(y_init) + 60 * count_out) * that.resultRatio);
                        } else {
                            van.fillText(that.data[j].result_1, (Number(x_init) + 150 * count_in) * that.resultRatio, (Number(y_init) + 60 * count_out) * that.resultRatio);
                        }
                        van.closePath();
                        van.beginPath();
                        van.font = '10px serif';
                        van.fillStyle = "#00cc33";
                        if (that.width < 100) {
                            van.fillText(j + 1, (Number(x_init) + 110 * count_in) * that.resultRatio - 15, (Number(y_init) + 60 * count_out) * that.resultRatio);
                        } else if (that.width < 300) {
                            van.fillText(j + 1, (Number(x_init) + 80 * count_in) * that.resultRatio - 15, (Number(y_init) + 60 * count_out) * that.resultRatio);
                        } else if (that.width < 800) {
                            van.fillText(j + 1, (Number(x_init) + 120 * count_in) * that.resultRatio - 10, (Number(y_init) + 60 * count_out) * that.resultRatio);
                        } else {
                            van.fillText(j + 1, (Number(x_init) + 150 * count_in) * that.resultRatio - 15, (Number(y_init) + 60 * count_out) * that.resultRatio);
                        }
                        van.closePath();
                        count_in++;
                    }
                    count_out++;
                }
            }
        },

        dataURLtoBlob(dataurl) {
            var arr = dataurl.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], { type: mime });
        },

        blobToFile(theBlob, fileName) {
            theBlob.lastModifiedDate = new Date();
            theBlob.name = fileName;
            return new File([theBlob], fileName, { type: theBlob.type, lastModified: Date.now() });
        }
    }
}
</script>
<style>
.mainDiv {
    width: 100%;
}

* {
    margin: 0;
    padding: 0;
}

.show {
    display: flex;
    justify-content: space-evenly;
}
</style>