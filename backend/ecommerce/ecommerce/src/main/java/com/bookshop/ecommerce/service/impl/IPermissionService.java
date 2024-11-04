package com.bookshop.ecommerce.service.impl;

import com.bookshop.ecommerce.model.Permission;
import com.bookshop.ecommerce.request.CreatePermissionRequest;

public interface IPermissionService {
    Permission createPermission(CreatePermissionRequest req);
}
