var killerCombos = [
    [1, 1]
    , [2, 2]
    , [3, 3]
    , [4, 4]
    , [5, 5]
    , [6, 6]
    , [7, 7]
    , [8, 8]
    , [9, 9]
    , [3, 12]
    , [4, 13]
    , [5, 14]
    , [5, 23]
    , [6, 15]
    , [6, 24]
    , [6, 123]
    , [7, 16]
    , [7, 25]
    , [7, 34]
    , [7, 124]
    , [8, 17]
    , [8, 26]
    , [8, 35]
    , [8, 125]
    , [8, 134]
    , [9, 18]
    , [9, 27]
    , [9, 36]
    , [9, 45]
    , [9, 126]
    , [9, 135]
    , [9, 234]
    , [10, 19]
    , [10, 28]
    , [10, 37]
    , [10, 46]
    , [10, 127]
    , [10, 136]
    , [10, 145]
    , [10, 235]
    , [10, 1234]
    , [11, 29]
    , [11, 38]
    , [11, 47]
    , [11, 56]
    , [11, 128]
    , [11, 137]
    , [11, 146]
    , [11, 236]
    , [11, 245]
    , [11, 1235]
    , [12, 39]
    , [12, 48]
    , [12, 57]
    , [12, 129]
    , [12, 138]
    , [12, 147]
    , [12, 156]
    , [12, 237]
    , [12, 246]
    , [12, 345]
    , [12, 1236]
    , [12, 1245]
    , [13, 49]
    , [13, 58]
    , [13, 67]
    , [13, 139]
    , [13, 148]
    , [13, 157]
    , [13, 238]
    , [13, 247]
    , [13, 256]
    , [13, 346]
    , [13, 1237]
    , [13, 1246]
    , [13, 1345]
    , [14, 59]
    , [14, 68]
    , [14, 149]
    , [14, 158]
    , [14, 167]
    , [14, 239]
    , [14, 248]
    , [14, 257]
    , [14, 347]
    , [14, 356]
    , [14, 1238]
    , [14, 1247]
    , [14, 1256]
    , [14, 1346]
    , [14, 2345]
    , [15, 69]
    , [15, 78]
    , [15, 159]
    , [15, 168]
    , [15, 249]
    , [15, 258]
    , [15, 267]
    , [15, 348]
    , [15, 357]
    , [15, 456]
    , [15, 1239]
    , [15, 1248]
    , [15, 1257]
    , [15, 1347]
    , [15, 1356]
    , [15, 2346]
    , [15, 12345]
    , [16, 79]
    , [16, 169]
    , [16, 178]
    , [16, 259]
    , [16, 268]
    , [16, 349]
    , [16, 358]
    , [16, 367]
    , [16, 457]
    , [16, 1249]
    , [16, 1258]
    , [16, 1267]
    , [16, 1348]
    , [16, 1357]
    , [16, 1456]
    , [16, 2347]
    , [16, 2356]
    , [16, 12346]
    , [17, 89]
    , [17, 179]
    , [17, 269]
    , [17, 278]
    , [17, 359]
    , [17, 368]
    , [17, 458]
    , [17, 467]
    , [17, 1259]
    , [17, 1268]
    , [17, 1349]
    , [17, 1358]
    , [17, 1367]
    , [17, 1457]
    , [17, 2348]
    , [17, 2357]
    , [17, 2456]
    , [17, 12347]
    , [17, 12356]
    , [18, 189]
    , [18, 279]
    , [18, 369]
    , [18, 378]
    , [18, 459]
    , [18, 468]
    , [18, 567]
    , [18, 1269]
    , [18, 1278]
    , [18, 1359]
    , [18, 1368]
    , [18, 1458]
    , [18, 1467]
    , [18, 2349]
    , [18, 2358]
    , [18, 2367]
    , [18, 2457]
    , [18, 3456]
    , [18, 12348]
    , [18, 12357]
    , [18, 12456]
    , [19, 289]
    , [19, 379]
    , [19, 469]
    , [19, 478]
    , [19, 568]
    , [19, 1279]
    , [19, 1369]
    , [19, 1378]
    , [19, 1459]
    , [19, 1468]
    , [19, 1567]
    , [19, 2359]
    , [19, 2368]
    , [19, 2458]
    , [19, 2467]
    , [19, 3457]
    , [19, 12349]
    , [19, 12358]
    , [19, 12367]
    , [19, 12457]
    , [19, 13456]
    , [20, 389]
    , [20, 479]
    , [20, 569]
    , [20, 578]
    , [20, 1289]
    , [20, 1379]
    , [20, 1469]
    , [20, 1478]
    , [20, 1568]
    , [20, 2369]
    , [20, 2378]
    , [20, 2459]
    , [20, 2468]
    , [20, 2567]
    , [20, 3458]
    , [20, 3467]
    , [20, 12359]
    , [20, 12368]
    , [20, 12458]
    , [20, 12467]
    , [20, 13457]
    , [20, 23456]
    , [21, 489]
    , [21, 579]
    , [21, 678]
    , [21, 1389]
    , [21, 1479]
    , [21, 1569]
    , [21, 1578]
    , [21, 2379]
    , [21, 2469]
    , [21, 2478]
    , [21, 2568]
    , [21, 3459]
    , [21, 3468]
    , [21, 3567]
    , [21, 12369]
    , [21, 12378]
    , [21, 12459]
    , [21, 12468]
    , [21, 12567]
    , [21, 13458]
    , [21, 13467]
    , [21, 23457]
    , [21, 123456]
    , [22, 589]
    , [22, 679]
    , [22, 1489]
    , [22, 1579]
    , [22, 1678]
    , [22, 2389]
    , [22, 2479]
    , [22, 2569]
    , [22, 2578]
    , [22, 3469]
    , [22, 3478]
    , [22, 3568]
    , [22, 4567]
    , [22, 12379]
    , [22, 12469]
    , [22, 12478]
    , [22, 12568]
    , [22, 13459]
    , [22, 13468]
    , [22, 13567]
    , [22, 23458]
    , [22, 23467]
    , [22, 123457]
    , [23, 689]
    , [23, 1589]
    , [23, 1679]
    , [23, 2489]
    , [23, 2579]
    , [23, 2678]
    , [23, 3479]
    , [23, 3569]
    , [23, 3578]
    , [23, 4568]
    , [23, 12389]
    , [23, 12479]
    , [23, 12569]
    , [23, 12578]
    , [23, 13469]
    , [23, 13478]
    , [23, 13568]
    , [23, 14567]
    , [23, 23459]
    , [23, 23468]
    , [23, 23567]
    , [23, 123458]
    , [23, 123467]
    , [24, 789]
    , [24, 1689]
    , [24, 2589]
    , [24, 2679]
    , [24, 3489]
    , [24, 3579]
    , [24, 3678]
    , [24, 4569]
    , [24, 4578]
    , [24, 12489]
    , [24, 12579]
    , [24, 12678]
    , [24, 13479]
    , [24, 13569]
    , [24, 13578]
    , [24, 14568]
    , [24, 23469]
    , [24, 23478]
    , [24, 23568]
    , [24, 24567]
    , [24, 123459]
    , [24, 123468]
    , [24, 123567]
    , [25, 1789]
    , [25, 2689]
    , [25, 3589]
    , [25, 3679]
    , [25, 4579]
    , [25, 4678]
    , [25, 12589]
    , [25, 12679]
    , [25, 13489]
    , [25, 13579]
    , [25, 13678]
    , [25, 14569]
    , [25, 14578]
    , [25, 23479]
    , [25, 23569]
    , [25, 23578]
    , [25, 24568]
    , [25, 34567]
    , [25, 123469]
    , [25, 123478]
    , [25, 123568]
    , [25, 124567]
    , [26, 2789]
    , [26, 3689]
    , [26, 4589]
    , [26, 4679]
    , [26, 5678]
    , [26, 12689]
    , [26, 13589]
    , [26, 13679]
    , [26, 14579]
    , [26, 14678]
    , [26, 23489]
    , [26, 23579]
    , [26, 23678]
    , [26, 24569]
    , [26, 24578]
    , [26, 34568]
    , [26, 123479]
    , [26, 123569]
    , [26, 123578]
    , [26, 124568]
    , [26, 134567]
    , [27, 3789]
    , [27, 4689]
    , [27, 5679]
    , [27, 12789]
    , [27, 13689]
    , [27, 14589]
    , [27, 14679]
    , [27, 15678]
    , [27, 23589]
    , [27, 23679]
    , [27, 24579]
    , [27, 24678]
    , [27, 34569]
    , [27, 34578]
    , [27, 123489]
    , [27, 123579]
    , [27, 123678]
    , [27, 124569]
    , [27, 124578]
    , [27, 134568]
    , [27, 234567]
    , [28, 4789]
    , [28, 5689]
    , [28, 13789]
    , [28, 14689]
    , [28, 15679]
    , [28, 23689]
    , [28, 24589]
    , [28, 24679]
    , [28, 25678]
    , [28, 34579]
    , [28, 34678]
    , [28, 123589]
    , [28, 123679]
    , [28, 124579]
    , [28, 124678]
    , [28, 134569]
    , [28, 134578]
    , [28, 234568]
    , [28, 1234567]
    , [29, 5789]
    , [29, 14789]
    , [29, 15689]
    , [29, 23789]
    , [29, 24689]
    , [29, 25679]
    , [29, 34589]
    , [29, 34679]
    , [29, 35678]
    , [29, 123689]
    , [29, 124589]
    , [29, 124679]
    , [29, 125678]
    , [29, 134579]
    , [29, 134678]
    , [29, 234569]
    , [29, 234578]
    , [29, 1234568]
    , [30, 6789]
    , [30, 15789]
    , [30, 24789]
    , [30, 25689]
    , [30, 34689]
    , [30, 35679]
    , [30, 45678]
    , [30, 123789]
    , [30, 124689]
    , [30, 125679]
    , [30, 134589]
    , [30, 134679]
    , [30, 135678]
    , [30, 234579]
    , [30, 234678]
    , [30, 1234569]
    , [30, 1234578]
    , [31, 16789]
    , [31, 25789]
    , [31, 34789]
    , [31, 35689]
    , [31, 45679]
    , [31, 124789]
    , [31, 125689]
    , [31, 134689]
    , [31, 135679]
    , [31, 145678]
    , [31, 234589]
    , [31, 234679]
    , [31, 235678]
    , [31, 1234579]
    , [31, 1234678]
    , [32, 26789]
    , [32, 35789]
    , [32, 45689]
    , [32, 125789]
    , [32, 134789]
    , [32, 135689]
    , [32, 145679]
    , [32, 234689]
    , [32, 235679]
    , [32, 245678]
    , [32, 1234589]
    , [32, 1234679]
    , [32, 1235678]
    , [33, 36789]
    , [33, 45789]
    , [33, 126789]
    , [33, 135789]
    , [33, 145689]
    , [33, 234789]
    , [33, 235689]
    , [33, 245679]
    , [33, 345678]
    , [33, 1234689]
    , [33, 1235679]
    , [33, 1245678]
    , [34, 46789]
    , [34, 136789]
    , [34, 145789]
    , [34, 235789]
    , [34, 245689]
    , [34, 345679]
    , [34, 1234789]
    , [34, 1235689]
    , [34, 1245679]
    , [34, 1345678]
    , [35, 56789]
    , [35, 146789]
    , [35, 236789]
    , [35, 245789]
    , [35, 345689]
    , [35, 1235789]
    , [35, 1245689]
    , [35, 1345679]
    , [35, 2345678]
    , [36, 156789]
    , [36, 246789]
    , [36, 345789]
    , [36, 1236789]
    , [36, 1245789]
    , [36, 1345689]
    , [36, 2345679]
    , [36, 12345678]
    , [37, 256789]
    , [37, 346789]
    , [37, 1246789]
    , [37, 1345789]
    , [37, 2345689]
    , [37, 12345679]
    , [38, 356789]
    , [38, 1256789]
    , [38, 1346789]
    , [38, 2345789]
    , [38, 12345689]
    , [39, 456789]
    , [39, 1356789]
    , [39, 2346789]
    , [39, 12345789]
    , [40, 1456789]
    , [40, 2356789]
    , [40, 12346789]
    , [41, 2456789]
    , [41, 12356789]
    , [42, 3456789]
    , [42, 12456789]
    , [43, 13456789]
    , [44, 23456789]
    , [45, 123456789]
]