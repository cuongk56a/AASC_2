import { SetMetadata } from '@nestjs/common'

// Decorator cho phép đánh dấu route là public, không yêu cầu xác thực
export const Public = () => SetMetadata('isPublic', true)
