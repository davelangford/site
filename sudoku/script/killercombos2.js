var killerCombos = [];
for (var i = 1; i <= 45; i++) {
    killerCombos[i] = [];
}        

killerCombos[1][1] = '1';
killerCombos[2][1] = '2';
killerCombos[3][1] = '3';
killerCombos[4][1] = '4';
killerCombos[5][1] = '5';
killerCombos[6][1] = '6';
killerCombos[7][1] = '7';
killerCombos[8][1] = '8';
killerCombos[9][1] = '9';
killerCombos[3][2] = '12';
killerCombos[4][2] = '13';
killerCombos[5][2] = '14 23';
killerCombos[6][2] = '15 24';
killerCombos[7][2] = '16 25 34';
killerCombos[8][2] = '17 26 35';
killerCombos[9][2] = '18 27 36 45';
killerCombos[10][2] = '19 28 37 46';
killerCombos[11][2] = '29 38 47 56';
killerCombos[12][2] = '39 48 57';
killerCombos[13][2] = '49 58 67';
killerCombos[14][2] = '59 68';
killerCombos[15][2] = '69 78';
killerCombos[16][2] = '79';
killerCombos[17][2] = '89';
killerCombos[6][3] = '123';
killerCombos[7][3] = '124';
killerCombos[8][3] = '125 134';
killerCombos[9][3] = '126 135 234';
killerCombos[10][3] = '127 136 145 235';
killerCombos[11][3] = '128 137 146 236 245';
killerCombos[12][3] = '129 138 147 156 237 246 345';
killerCombos[13][3] = '139 148 157 238 247 256 346';
killerCombos[14][3] = '149 158 167 239 248 257 347 356';
killerCombos[15][3] = '159 168 249 258 267 348 357 456';
killerCombos[16][3] = '169 178 259 268 349 358 367 457';
killerCombos[17][3] = '179 269 278 359 368 458 467';
killerCombos[18][3] = '189 279 369 378 459 468 567';
killerCombos[19][3] = '289 379 469 478 568';
killerCombos[20][3] = '389 479 569 578';
killerCombos[21][3] = '489 579 678';
killerCombos[22][3] = '589 679';
killerCombos[23][3] = '689';
killerCombos[24][3] = '789';
killerCombos[10][4] = '1234';
killerCombos[11][4] = '1235';
killerCombos[12][4] = '1236 1245';
killerCombos[13][4] = '1237 1246 1345';
killerCombos[14][4] = '1238 1247 1256 1346 2345';
killerCombos[15][4] = '1239 1248 1257 1347 1356 2346';
killerCombos[16][4] = '1249 1258 1267 1348 1357 1456 2347 2356';
killerCombos[17][4] = '1259 1268 1349 1358 1367 1457 2348 2357 2456';
killerCombos[18][4] = '1269 1278 1359 1368 1458 1467 2349 2358 2367 2457 3456';
killerCombos[19][4] = '1279 1369 1378 1459 1468 1567 2359 2368 2458 2467 3457';
killerCombos[20][4] = '1289 1379 1469 1478 1568 2369 2378 2459 2468 2567 3458 3467';
killerCombos[21][4] = '1389 1479 1569 1578 2379 2469 2478 2568 3459 3468 3567';
killerCombos[22][4] = '1489 1579 1678 2389 2479 2569 2578 3469 3478 3568 4567';
killerCombos[23][4] = '1589 1679 2489 2579 2678 3479 3569 3578 4568';
killerCombos[24][4] = '1689 2589 2679 3489 3579 3678 4569 4578';
killerCombos[25][4] = '1789 2689 3589 3679 4579 4678';
killerCombos[26][4] = '2789 3689 4589 4679 5678';
killerCombos[27][4] = '3789 4689 5679';
killerCombos[28][4] = '4789 5689';
killerCombos[29][4] = '5789';
killerCombos[30][4] = '6789';
killerCombos[15][5] = '12345';
killerCombos[16][5] = '12346';
killerCombos[17][5] = '12347 12356';
killerCombos[18][5] = '12348 12357 12456';
killerCombos[19][5] = '12349 12358 12367 12457 13456';
killerCombos[20][5] = '12359 12368 12458 12467 13457 23456';
killerCombos[21][5] = '12369 12378 12459 12468 12567 13458 13467 23457';
killerCombos[22][5] = '12379 12469 12478 12568 13459 13468 13567 23458 23467';
killerCombos[23][5] = '12389 12479 12569 12578 13469 13478 13568 14567 23459 23468 23567';
killerCombos[24][5] = '12489 12579 12678 13479 13569 13578 14568 23469 23478 23568 24567';
killerCombos[25][5] = '12589 12679 13489 13579 13678 14569 14578 23479 23569 23578 24568 34567';
killerCombos[26][5] = '12689 13589 13679 14579 14678 23489 23579 23678 24569 24578 34568';
killerCombos[27][5] = '12789 13689 14589 14679 15678 23589 23679 24579 24678 34569 34578';
killerCombos[28][5] = '13789 14689 15679 23689 24589 24679 25678 34579 34678';
killerCombos[29][5] = '14789 15689 23789 24689 25679 34589 34679 35678';
killerCombos[30][5] = '15789 24789 25689 34689 35679 45678';
killerCombos[31][5] = '16789 25789 34789 35689 45679';
killerCombos[32][5] = '26789 35789 45689';
killerCombos[33][5] = '36789 45789';
killerCombos[34][5] = '46789';
killerCombos[35][5] = '56789';
killerCombos[21][6] = '123456';
killerCombos[22][6] = '123457';
killerCombos[23][6] = '123458 123467';
killerCombos[24][6] = '123459 123468 123567';
killerCombos[25][6] = '123469 123478 123568 124567';
killerCombos[26][6] = '123479 123569 123578 124568 134567';
killerCombos[27][6] = '123489 123579 123678 124569 124578 134568 234567';
killerCombos[28][6] = '123589 123679 124579 124678 134569 134578 234568';
killerCombos[29][6] = '123689 124589 124679 125678 134579 134678 234569 234578';
killerCombos[30][6] = '123789 124689 125679 134589 134679 135678 234579 234678';
killerCombos[31][6] = '124789 125689 134689 135679 145678 234589 234679 235678';
killerCombos[32][6] = '125789 134789 135689 145679 234689 235679 245678';
killerCombos[33][6] = '126789 135789 145689 234789 235689 245679 345678';
killerCombos[34][6] = '136789 145789 235789 245689 345679';
killerCombos[35][6] = '146789 236789 245789 345689';
killerCombos[36][6] = '156789 246789 345789';
killerCombos[37][6] = '256789 346789';
killerCombos[38][6] = '356789';
killerCombos[39][6] = '456789';
killerCombos[28][7] = '1234567';
killerCombos[29][7] = '1234568';
killerCombos[30][7] = '1234569 1234578';
killerCombos[31][7] = '1234579 1234678';
killerCombos[32][7] = '1234589 1234679 1235678';
killerCombos[33][7] = '1234689 1235679 1245678';
killerCombos[34][7] = '1234789 1235689 1245679 1345678';
killerCombos[35][7] = '1235789 1245689 1345679 2345678';
killerCombos[36][7] = '1236789 1245789 1345689 2345679';
killerCombos[37][7] = '1246789 1345789 2345689';
killerCombos[38][7] = '1256789 1346789 2345789';
killerCombos[39][7] = '1356789 2346789';
killerCombos[40][7] = '1456789 2356789';
killerCombos[41][7] = '2456789';
killerCombos[42][7] = '3456789';
killerCombos[36][8] = '12345678';
killerCombos[37][8] = '12345679';
killerCombos[38][8] = '12345689';
killerCombos[39][8] = '12345789';
killerCombos[40][8] = '12346789';
killerCombos[41][8] = '12356789';
killerCombos[42][8] = '12456789';
killerCombos[43][8] = '13456789';
killerCombos[44][8] = '23456789';
killerCombos[45][9] = '123456789';

var gridRotate = [];
// draw a grid in comments, staring with 0 in top left, ending with 80 in bottom right
// 0   1  2  3  4  5  6  7  8
// 9  10 11 12 13 14 15 16 17
// 18 19 20 21 22 23 24 25 26
// 27 28 29 30 31 32 33 34 35
// 36 37 38 39 40 41 42 43 44
// 45 46 47 48 49 50 51 52 53
// 54 55 56 57 58 59 60 61 62
// 63 64 65 66 67 68 69 70 71
// 72 73 74 75 76 77 78 79 80

gridRotate[0] = 8;
gridRotate[1] = 17;
gridRotate[2] = 26;
gridRotate[3] = 35;
gridRotate[4] = 44;
gridRotate[5] = 53;
gridRotate[6] = 62;
gridRotate[7] = 71;
gridRotate[8] = 80;
gridRotate[9] = 7;
gridRotate[10] = 16;
gridRotate[11] = 25;
gridRotate[12] = 34;
gridRotate[13] = 43;
gridRotate[14] = 52;
gridRotate[15] = 61;
gridRotate[16] = 70;
gridRotate[17] = 79;
gridRotate[18] = 6;
gridRotate[19] = 15;
gridRotate[20] = 24;
gridRotate[21] = 33;
gridRotate[22] = 42;
gridRotate[23] = 51;
gridRotate[24] = 60;
gridRotate[25] = 69;
gridRotate[26] = 78;
gridRotate[27] = 5;
gridRotate[28] = 14;
gridRotate[29] = 23;
gridRotate[30] = 32;
gridRotate[31] = 41;
gridRotate[32] = 50;
gridRotate[33] = 59;
gridRotate[34] = 68;
gridRotate[35] = 77;
gridRotate[36] = 4;
gridRotate[37] = 13;
gridRotate[38] = 22;
gridRotate[39] = 31;
gridRotate[40] = 40;
gridRotate[41] = 49;
gridRotate[42] = 58;
gridRotate[43] = 67;
gridRotate[44] = 76;
gridRotate[45] = 3;
gridRotate[46] = 12;
gridRotate[47] = 21;
gridRotate[48] = 30;
gridRotate[49] = 39;
gridRotate[50] = 48;
gridRotate[51] = 57;
gridRotate[52] = 66;
gridRotate[53] = 75;
gridRotate[54] = 2;
gridRotate[55] = 11;
gridRotate[56] = 20;
gridRotate[57] = 29;
gridRotate[58] = 38;
gridRotate[59] = 47;
gridRotate[60] = 56;
gridRotate[61] = 65;
gridRotate[62] = 74;
gridRotate[63] = 1;
gridRotate[64] = 10;
gridRotate[65] = 19;
gridRotate[66] = 28;
gridRotate[67] = 37;
gridRotate[68] = 46;
gridRotate[69] = 55;
gridRotate[70] = 64;
gridRotate[71] = 73;
gridRotate[72] = 0;
gridRotate[73] = 9;
gridRotate[74] = 18;
gridRotate[75] = 27;
gridRotate[76] = 36;
gridRotate[77] = 45;
gridRotate[78] = 54;
gridRotate[79] = 63;
gridRotate[80] = 72;











