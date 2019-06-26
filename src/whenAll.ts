
export async function whenAll(tasks: Promise<any>[]) {

    for (let t of tasks) 
        await t;
}