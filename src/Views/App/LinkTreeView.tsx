import { useEffect, useState } from "react";
import { social } from "../../data/social"
import { DevTreeInput } from "../../components/DevTreeInput";
import { isValidUrl } from "../../utils";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../../api/DevTreeApi";
import { SocialNetwork, User } from "../../types";

const LinkTreeView = () => {
    const [devTreeLinks, setDevTreeLinks] = useState(social)
    const queryClient = useQueryClient()
    const user: User = queryClient.getQueryData(['user'])!
    


    const { mutate } = useMutation({
        mutationFn: updateProfile,
        onError: (error) => toast.error(error.message),
        onSuccess: () => {
            toast.success('Acualizado correctamente')
        }
    })


    useEffect(() => {
        const updateData = devTreeLinks.map(item => {
            const userLink = JSON.parse(user.links).find((link: SocialNetwork) => link.name === item.name)
            if (userLink) {
                return { ...item, url: userLink.url, enabled: userLink.enabled }
            }
            return item
        })

        setDevTreeLinks(updateData)
    }, [])

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedLinks = devTreeLinks.map(link => link.name === e.target.name ? { ...link, url: e.target.value } : link)
        setDevTreeLinks(updatedLinks)
    }

    const links: SocialNetwork[] = JSON.parse(user.links)

    const handleEnableLink = (socialNetwork: string) => {
        const updateLinks = devTreeLinks.map(link => {
            if (link.name === socialNetwork) {
                if (isValidUrl(link.url)) {
                    return { ...link, enabled: !link.enabled }
                } else {
                    toast.error('URL no válida')
                }
            }
            return link
        })
        setDevTreeLinks(updateLinks)

        let updateItems: SocialNetwork[] = []

        const selectSocialNetwork = updateLinks.find(link => link.name === socialNetwork)

        if (selectSocialNetwork?.enabled) {
            const id = links.filter(link => link.id).length
            if (links.some(link => link.name === socialNetwork)) {
                // @ts-ignore
                updateItems = links.map(link => {
                    if (link.name === socialNetwork) {
                        return {
                            ...link,
                            enabled: true,
                            id
                        }
                    } else {
                        return link
                    }
                })
            } else {
                const newItem = {
                    ...selectSocialNetwork,
                    id: links.length + 1
                }
                updateItems = [...links, newItem]
               
                
            }



        } else {
           const indexToUpdate = links.findIndex(link => link.name === socialNetwork)
            updateItems = links.map(link => {
                if (link.name === socialNetwork) {
                    return {
                        ...link,
                        id: 0,
                        enabled: false
                    }
                } else if (link.id > indexToUpdate ) {
                    return {
                        ...link,
                        id: link.id - 1
                    }
                } else {
                    return link
                }
            })
        }

        queryClient.setQueryData(['user'], (prevData: User) => {
            return {
                ...prevData,
                links: JSON.stringify(updateItems)
            }
        })

    }



    return (
        <div className='space-y-5'>
            {devTreeLinks.map(item => (
                <DevTreeInput key={item.name} item={item} handleUrlChange={handleUrlChange} handleEnableLink={handleEnableLink} />
            ))}
            <button
                className="bg-fuchsia-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold"
                onClick={() => mutate(queryClient.getQueryData(['user'])!)}
            >
                Guardar cambios
            </button>
        </div>
    );
}

export default LinkTreeView;
