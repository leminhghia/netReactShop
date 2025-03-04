using System;
using Microsoft.EntityFrameworkCore;

namespace API.RequestHelpers;

public class PagedList<T> : List<T>
{
    public PagedList(List<T> items, int count, int pageNumber, int pageSize)
    {
        MetaData = new PaginationMetaData
        {
            TotalCount = count,//105
            PageSize = pageSize,//10
            CurrentPage = pageNumber,//2
            //105/10 = 11
            TotalPages = (int)Math.Ceiling(count / (double)pageSize)
        };
        AddRange(items);
        //      "metaData": {
        //     "totalCount": 105,
        //     "pageSize": 10,
        //     "curretPage": 2,
        //     "totalPages": 11
        // },
        // "items": [
        //     { "id": 11, "name": "Product 11" },
        //     { "id": 12, "name": "Product 12" },
        //     { "id": 13, "name": "Product 13" }
        // ]
    }
    public PaginationMetaData MetaData { get; set; }

    public static async Task<PagedList<T>> ToPagedList(IQueryable<T> query, int pageNumber, int pageSize)
    {
        //iqueryable la biểu thức truy vấn chưa thực thi
        var count = await query.CountAsync();
        //         pageNumber = 2, pageSize = 10
        // Skip((2 - 1) * 10) = Skip(10) (Bỏ qua 10 phần tử đầu tiên)
        // Take(10): Lấy 10 phần tử tiếp theo.
        var items = await query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
        return new PagedList<T>(items, count, pageNumber, pageSize);
    }
}
