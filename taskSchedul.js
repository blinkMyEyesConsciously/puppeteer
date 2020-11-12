

const ajax = (id) => new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve(`${id}的结果`);
	}, 500);
})
const pipRequest = (idsarr, callback) => {

	const start = Date.now();

	const len = idsarr.length;
	const result = []; // 结果集
	const ajaxMax = 3; // 最多允许同时执行的ajax次数
	let ajaxNum = 0; // 当前有多少ajax正在执行


	const main = (ids) => {
		console.log(`时间：${Date.now() - start}`);
		while (ajaxNum <= ajaxMax && ids.length > 0) { // 只要有位置就发请求
			ajaxNum++;
			const now = ids.shift() // 发了一个请求
			ajax(now).then(res => {
				result.push(res);
				main(ids);
			}).catch((_) => {
				console.log('任务失败')
			}).finally(() => {
				ajaxNum--;
				(
					result.length === len
					&& typeof callback === 'function'
					&& callback(result)
				);
			})

		}
	}
	main(idsarr);
}

pipRequest([...Array(100).keys()], function (res) {
	console.log(res);
})

