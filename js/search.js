/*
 * @Author: wanjunliang 
 * @Date: 2018-08-30 11:35:01 
 * @Last Modified by: wanjunliang
 * @Last Modified time: 2018-10-24 09:09:43
 */

// 家族史搜索
// requestDet 搜索内容
// responseDet 搜索结果
// familyHistoryLocation缓存key
function familyHistoryLocation(requestDet, responseDet, responseErr) {
    var familyHistoryLocation = JSON.parse(localStorage.getItem("maternalfamilyHistoryLocation"));
    var repDataArr = [];
    if (familyHistoryLocation == '' || familyHistoryLocation == null) {
        HttpRequstForPost(httpUrl.findListForSpellName, 'json', {
            'spellName': '',
            "token": token,
        }, function sucFn(data) {
            if (data.status == 20200) {
                var tempDataArr = data.padAnamnesisIllnessBeanList;
                localStorage.setItem('maternalfamilyHistoryLocation', JSON.stringify(tempDataArr));
            }
        },
            function errfn(err) {
                responseErr(responseErr);
            });
    } else {
        for (let index = 0; index < familyHistoryLocation.length; index++) {
            if (familyHistoryLocation[index].spellName.match(requestDet)) {
                repDataArr.push(familyHistoryLocation[index].anamnesisIllnessName);
            }
        
        }
        responseDet(repDataArr);
    }

}

// 接触毒物搜索
// requestDet 搜索内容
// responseDet 搜索结果
// contactPoisonLocation缓存key
// responseErr 
// function contactPoisonLocation(requestDet, responseDet, responseErr) {
//     var contactPoisonLocation = JSON.parse(localStorage.getItem("contactPoisonLocation"));
//     var repDataArr = [];
//     if (contactPoisonLocation == '' || contactPoisonLocation == null) {
//         HttpRequstForPost(httpUrl.poisonTemplate, 'json', {
//             'spellName': '',
//             "token": token,
//         }, function sucFn(data) {
//             if (data.status == 20200) {
//                 var tempDataArr = data.padPoisonTemplateBeanList;
//                 localStorage.setItem('contactPoisonLocation', JSON.stringify(tempDataArr));
//             }
//         },
//             function errfn(err) {
//                 responseErr(responseErr);
//             });
//     } else {
//         for (let index = 0; index < contactPoisonLocation.length; index++) {
//             if (contactPoisonLocation[index].spellName.match(requestDet)) {
//                 repDataArr.push(contactPoisonLocation[index].name);
//             }
//         }
//         responseDet(repDataArr);
//     }

// }