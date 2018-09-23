package com.duan.blogos.service.service.blogger;


import com.duan.blogos.service.dto.blogger.BloggerCategoryDTO;
import com.duan.blogos.service.restful.PageResult;
import com.duan.blogos.service.restful.ResultModel;

/**
 * Created on 2017/12/18.
 * 博主博文类别服务
 *
 * @author DuanJiaNing
 */
public interface BloggerCategoryService {

    /**
     * 获取博主创建的博文类别，按时间倒序排序
     *
     * @param bloggerId 博主id
     * @return 查询结果
     */
    ResultModel<PageResult<BloggerCategoryDTO>> listBlogCategory(Long bloggerId, Integer pageNum, Integer pageSize);

    /**
     * 修改类别
     *
     * @param bloggerId  博主id
     * @param categoryId 类别id
     * @param newIconId  新的类别图标，不修改传 -1
     * @param newTitle   新标题，不修改传 null
     * @param newBewrite 新描述，不修改传 null
     * @return 更新失败为false
     */
    boolean updateBlogCategory(Long bloggerId, Long categoryId, Long newIconId, String newTitle, String newBewrite);

    /**
     * 新增博文类别
     * 若指定了类别图标，将图标对应图片修改为“公开”
     *
     * @param bloggerId 类别所属博主id
     * @param iconId    类别标签id，为null传递-1
     * @param title     标题
     * @param desc      描述
     * @return 新纪录id
     */
    Long insertBlogCategory(Long bloggerId, Long iconId, String title, String desc);

    /**
     * 删除类别，同时移动类别下所有文章到新的类别中
     *
     * @param bloggerId     博主id
     * @param categoryId    要删除的类别
     * @param newCategoryId 新的类别（新类别创建者创建的类别），不修改传递-1
     */
    boolean deleteCategoryAndMoveBlogsTo(Long bloggerId, Long categoryId, Long newCategoryId);

    /**
     * 根据id获得指定博文类别
     *
     * @param bloggerId  博主id
     * @param categoryId 博文类别id
     * @return 查询结果
     */
    BloggerCategoryDTO getCategory(Long bloggerId, Long categoryId);
}
