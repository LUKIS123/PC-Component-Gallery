using ComponentGallery.Server.Infrastructure.BlobService.Exceptions;

namespace ComponentGallery.Server.Infrastructure.BlobService.Middleware;

public class BlobServiceExceptionHandlingMiddleware(ILogger<BlobServiceExceptionHandlingMiddleware> logger) : IMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next.Invoke(context);
        }
        catch (ContentNotFoundException ex)
        {
            context.Response.StatusCode = 404;
            await context.Response.WriteAsync(string.Empty);
            logger.LogInformation("Content not found:{message}", ex.Message);
        }
        catch (UnsupportedResourceFormatException ex)
        {
            context.Response.StatusCode = 400;
            await context.Response.WriteAsync(ex.Message);
            logger.LogWarning("Unsupported image format:{message}", ex.Message);
        }
    }
}
