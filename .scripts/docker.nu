def --env "docker-login" [
    token: string,
    registery = "ghcr.io",
    username = "pmdevers"
] {

    echo $"($token)" | docker login $registery -u $"($username)" --password-stdin
}

def "docker-tag" [
    existing: string,
    new: string
] {
    docker pull $existing
    docker tag $existing $new
    docker push $new
}

def "docker-push" [
    image: string
] {
    docker push $image 
}

def --env "docker-build" [
    tag
] {
    docker buildx create --use
    
    (
        docker buildx build 
            --platform linux/amd64,linux/arm64 
            --tag $tag
            .
        docker push $tag
    )
}

def "create-image" [
    registery: string,
    username: string,
    image: string,
    tag: string,
] {
    # Get the default image name from the git repo if not provided
    mut imagename = (git rev-parse --show-toplevel | path basename)

    if not ($image | is-empty) {
        $imagename = $image
    }

    mut version = $tag

    if ($tag | is-empty) {
        let git_branch = (git rev-parse --abbrev-ref HEAD | str trim)
        let git_commit = (git rev-parse --short HEAD | str trim)
        let timestamp = (date now | format date "%s")

        $version = $"($git_branch)-($git_commit)-($timestamp)"
    }

    print $"Image version: ($registery)/($username)/($imagename):($version)"

    $"($registery)/($username)/($imagename):($version)"
}