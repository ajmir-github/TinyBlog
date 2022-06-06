// 1 - util function
// This is to connect a series of if statements
exports.ifs = function (ands = true) {
    return {
        conditions:[],
        is(condition){
            this.conditions.push(
                condition === true
            );
            return this;
        },
        not(condition){
            this.conditions.push(
                condition === false
            );
            return this;
        },
        finalize(){
            if(ands) return this
                .conditions
                .every(v => v);
            return this.conditions
                .some(v => v)
        }
    };
}
// // test
// const canCreate = ifs()
//     .is(true)
//     .not(false)
//     .not(true)
//     .finalize()

// console.log({canCreate});


// 2 - util function
// This is to compare all the given statements with the orgin
function compares(orgin, ands = true) {
    return {
        orgin,
        conditions:[],
        compare(value){
            this.conditions
                .push(orgin === value);
            return this;
        },
        isGT(value){
            this.conditions
                .push(orgin > value);
            return this;
        },
        isLT(value){
            this.conditions
                .push(orgin < value);
            return this;
        },
        finalize(){
            if(ands) return this
                .conditions
                .every(v => v);
            return this.conditions
                .some(v => v)
        }
    };
}

// // test
// const age = 22;
// const canAddUser = compares(age, false)
//     .isGT(18)
//     .isLT(30)
//     .compare(20)
//     .finalize()

// console.log({canAddUser});