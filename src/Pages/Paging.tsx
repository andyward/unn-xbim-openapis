
/** Represents Paging State when working on a window of data */
export class PagingState {
	// should use a Reducer
	setTotal(total: number) {
		this.count = total;
		this.totalPages = Math.ceil(total / this.top);
	}
	setPageNo(pageNo: number) {
		this.pageNo = pageNo;
		this.skip = (Math.max(0, pageNo - 1) * this.top);
	}
	count: number = 0;
	top: number = 12;
	skip?: number = undefined;
	pageNo: number = 1;
	totalPages: number = 0;
	sort = 'DateUploaded desc';
}
